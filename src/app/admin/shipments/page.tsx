import prisma from "@/lib/prisma";

export default async function ShipmentsManagement({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const shipments = await prisma.shipment.findMany({
    where: q
      ? {
          OR: [
            { trackingNumber: { contains: q } },
            { senderName: { contains: q } },
            { receiverName: { contains: q } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="admin-table-container">
        <div className="admin-table-header">
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
              Management Dashboard
            </h2>
            <form action="/admin/shipments" method="GET" className="search-bar" style={{ position: "relative" }}>
              <input
                name="q"
                type="text"
                placeholder="Search by ID or Name..."
                defaultValue={q}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  width: "300px",
                }}
              />
            </form>
          </div>
          <button
            className="btn-admin-action"
            style={{ background: "#111", color: "#FFCC00", fontWeight: 700 }}
          >
            + New Shipment
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>From / To</th>
              <th>Sender / Receiver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                  No shipments found in the database.
                </td>
              </tr>
            ) : (
              shipments.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.trackingNumber}</td>
                  <td>
                    {s.senderCity} → {s.receiverCity}
                  </td>
                  <td>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      From: {s.senderName}
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "#333", fontWeight: 600 }}
                    >
                      To: {s.receiverName}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${s.status.toLowerCase()}`}>
                      {s.status.replace("_", " ")}
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: "8px" }}>
                    <button className="btn-admin-action">Update Status</button>
                    <button className="btn-admin-action">Label</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
