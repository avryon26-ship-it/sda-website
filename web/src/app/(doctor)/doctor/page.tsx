import { isDoctor } from '@/lib/doctorAuth';
import { listRequests } from '@/lib/requests';
import { getContent } from '@/lib/content';
import Desk from '@/components/doctor/Desk';
import PinGate from '@/components/doctor/PinGate';

export const dynamic = 'force-dynamic';

export default async function DoctorPage() {
  if (!(await isDoctor())) return <PinGate />;
  const products = getContent('en').products.map(p => ({ slug: p.slug, name: p.name, image: p.image, category: p.category }));
  return <Desk initial={await listRequests()} products={products} serverNow={Date.now()} />;
}
