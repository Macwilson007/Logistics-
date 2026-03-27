import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@logistics.com' },
    update: {},
    create: {
      email: 'admin@logistics.com',
      name: 'Super Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log({ admin });

  // Create some initial site content
  await prisma.siteContent.upsert({
    where: { key: 'page_about' },
    update: {},
    create: {
      key: 'page_about',
      value: JSON.stringify({
        title: 'About Our Logistics Network',
        subtitle: 'Connecting the world through innovative supply chain solutions and local expertise since 1995.',
        content: `
          <p>Founded in Lagos, Nigeria, we have grown from a local courier service into a global logistics powerhouse. 
          Our commitment to reliability remains unchanged as we scale across continents.</p>
          <h3>Our Values</h3>
          <ul>
            <li><strong>Reliability:</strong> We keep our promises, every time.</li>
            <li><strong>Innovation:</strong> Using technology to simplify global trade.</li>
            <li><strong>Sustainability:</strong> Committed to green logistics and net-zero emissions.</li>
          </ul>
        `
      }),
      type: 'html',
      page: 'about'
    }
  });

  // Create a sample shipment
  await prisma.shipment.upsert({
    where: { trackingNumber: 'LG-2026-84729' },
    update: {},
    create: {
      trackingNumber: 'LG-2026-84729',
      status: 'IN_TRANSIT',
      senderName: 'Sarah Johnson',
      senderEmail: 'sarah@techcorp.com',
      senderPhone: '+234 800 123 4567',
      senderAddress: '123 Tech Hub, Victoria Island',
      senderCity: 'Lagos',
      senderCountry: 'Nigeria',
      receiverName: 'Michael Chen',
      receiverEmail: 'm.chen@globalimports.uk',
      receiverPhone: '+44 20 7123 4567',
      receiverAddress: '45 Import Quay, Docklands',
      receiverCity: 'London',
      receiverCountry: 'United Kingdom',
      packageDesc: 'Electronics and spare parts',
      weight: 4.2,
      serviceType: 'Express International',
      updates: {
        create: [
          { status: 'Shipment Picked Up', location: 'Lagos, NG', detail: 'Package collected from sender' },
          { status: 'Departed Origin Facility', location: 'Lagos Hub, NG', detail: 'Shipment departed origin hub' },
          { status: 'Arrived at Transit Hub', location: 'Abuja, NG', detail: 'Package arrived at transit facility' },
          { status: 'In Transit — International', location: 'En Route', detail: 'Shipment is on its way to destination country' },
        ]
      }
    }
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
