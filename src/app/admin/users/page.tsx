import prisma from "@/lib/prisma";

export default async function UsersManagement({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="admin-table-container animate-fade-in">
      <div className="admin-table-header">
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>User Accounts</h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <form action="/admin/users" method="GET">
            <input
              name="q"
              type="text"
              placeholder="Search users..."
              className="btn-admin-action"
              style={{ width: "240px", cursor: "text" }}
              defaultValue={q}
            />
          </form>
          <button className="btn-admin-action" style={{ background: "#111", color: "white" }}>
            + Add User
          </button>
        </div>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td style={{ fontWeight: 600 }}>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className="badge badge-active">Active</span>
                </td>
                <td style={{ display: "flex", gap: "8px" }}>
                  <button className="btn-admin-action">Edit Role</button>
                  <button
                    className="btn-admin-action"
                    style={{ color: "#EF4444", borderColor: "#FEE2E2" }}
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
