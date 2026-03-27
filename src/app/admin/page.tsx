import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const [
    activeShipmentsCount,
    pendingShipmentsCount,
    quoteRequestsCount,
    revenueData,
    recentShipments
  ] = await Promise.all([
    prisma.shipment.count({ where: { status: { not: "DELIVERED" } } }),
    prisma.shipment.count({ where: { status: "PENDING" } }),
    prisma.quoteRequest.count(),
    prisma.quoteRequest.aggregate({ _sum: { price: true } }),
    prisma.shipment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    })
  ]);

  const stats = [
    { label: "Active Shipments", value: activeShipmentsCount.toLocaleString(), trend: "Live Stat" },
    { label: "Total Revenue", value: `$${(revenueData._sum.price || 0).toLocaleString()}`, trend: "From Quotes" },
    { label: "Pending Pickups", value: pendingShipmentsCount.toLocaleString(), trend: "Needs Action" },
    { label: "Quote Requests", value: quoteRequestsCount.toLocaleString(), trend: "Lead Generation" }
  ];

  return (
    <div>
      <div className="admin-summary animate-fade-in">
        {stats.map((stat, i) => (
          <div key={i} className="admin-card">
            <span className="admin-card-label">{stat.label}</span>
            <span className="admin-card-value">{stat.value}</span>
            <span className="admin-card-trend trend-up">
              {stat.trend}
            </span>
          </div>
        ))}
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Recently Logged Shipments</h2>
          <Link href="/admin/shipments" className="btn-admin-action">
            View All Shipments
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentShipments.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                  No recent shipment data available.
                </td>
              </tr>
            ) : (
              recentShipments.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.trackingNumber}</td>
                  <td>{s.receiverCity}, {s.receiverCountry}</td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge badge-${s.status.toLowerCase()}`}>
                      {s.status.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/shipments`} className="btn-admin-action">
                      Details
                    </Link>
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
