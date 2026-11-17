import Link from 'next/link';
export default function Home() {
  return (
    <main className="wrap py-24">
      <p className="label">Sri Dhanvanthri Ayurveda · Tirunelveli</p>
      <h1 className="mt-6" style={{ fontSize: 'var(--fs-h1)' }}>Design proposal <em>in review</em></h1>
      <p className="mt-8 max-w-xl text-[1.15rem]">The previous look has been withdrawn. The new design system is on one page, for your approval, before any page is built.</p>
      <Link href="/design" className="btn btn-primary mt-10">Open the design system</Link>
    </main>
  );
}
