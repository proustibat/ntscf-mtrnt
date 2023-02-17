import Head from 'next/head';
import Layout from '@/components/Layout';
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Pachelbel - Canon [Metronaut by Antescofo]</title>
      </Head>
      <section>
        <h1>Hello world</h1>
      </section>

      <section>
        <p>Page content</p>
      </section>
    </Layout>
  );
}
