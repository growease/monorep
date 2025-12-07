export function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-gray-900">GrowEase</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Future: User menu, notifications, etc. */}
        </div>
      </div>
    </nav>
  );
}

