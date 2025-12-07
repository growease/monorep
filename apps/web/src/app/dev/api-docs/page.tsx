import { PageHeader } from '@/components/ui/PageHeader';

export default function ApiDocsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="API Documentation"
        description="Internal documentation for consuming the GrowEase API"
      />

      <div className="card space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">GraphQL API</h2>
          <p className="text-gray-600 mb-4">
            The primary API is GraphQL. You can explore the schema and test queries using the
            GraphQL Playground.
          </p>
          <div className="space-y-2">
            <div>
              <strong>Endpoint:</strong>{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {apiUrl}/graphql
              </code>
            </div>
            <div>
              <strong>Playground:</strong>{' '}
              <a
                href={`${apiUrl}/graphql`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Open GraphQL Playground →
              </a>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-3">REST API</h2>
          <p className="text-gray-600 mb-4">
            REST endpoints are available for health checks and other operations. Full documentation
            is available via Swagger.
          </p>
          <div className="space-y-2">
            <div>
              <strong>Swagger UI:</strong>{' '}
              <a
                href={`${apiUrl}/api-docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Open Swagger Documentation →
              </a>
            </div>
            <div>
              <strong>Health Check:</strong>{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                GET {apiUrl}/api/health
              </code>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-3">Example: Health Check Query</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`query Health {
  health {
    status
    timestamp
    uptime
    services {
      database
    }
  }
}`}</code>
          </pre>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <div className="bg-info-50 border border-info-200 rounded-lg p-4">
            <p className="text-sm text-info-800">
              <strong>TODO:</strong> In the future, we will auto-generate typed GraphQL clients
              from the backend schema to improve type safety and developer experience.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

