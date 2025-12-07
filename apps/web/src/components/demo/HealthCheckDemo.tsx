'use client';

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { HealthStatus } from '@growease/types';

const HEALTH_QUERY = gql`
  query Health {
    health {
      status
      timestamp
      uptime
      services {
        database
      }
    }
  }
`;

export function HealthCheckDemo() {
  const { data, loading, error, refetch } = useQuery<{ health: HealthStatus }>(
    HEALTH_QUERY
  );

  if (loading) {
    return (
      <div className="card">
        <LoadingState message="Checking API health..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <ErrorState
          title="Failed to connect to API"
          message={
            error.message ||
            'Unable to reach the GraphQL endpoint. Make sure the API server is running.'
          }
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const health = data?.health;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">API Health Check</h2>
      {health && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                health.status === 'ok'
                  ? 'bg-success-100 text-success-800'
                  : 'bg-error-100 text-error-800'
              }`}
            >
              {health.status.toUpperCase()}
            </span>
          </div>
          {health.uptime !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime:</span>
              <span className="text-gray-900 font-mono">
                {Math.floor(health.uptime / 60)}m {health.uptime % 60}s
              </span>
            </div>
          )}
          {health.services && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Services:</h3>
              <div className="space-y-2">
                {Object.entries(health.services).map(([service, status]) => (
                  <div key={service} className="flex items-center justify-between">
                    <span className="text-gray-600 capitalize">{service}:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        status === 'healthy'
                          ? 'bg-success-100 text-success-700'
                          : 'bg-error-100 text-error-700'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button onClick={() => refetch()} className="btn-secondary text-sm">
              Refresh Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

