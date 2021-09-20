import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import styles from "../../styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";

const EventPage = ({ evt }) => {
  console.log(evt);
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>

        {evt.image.length > 0 && (
          <div className={styles.image}>
            <Image
              src={
                evt.image
                  ? evt.image[0].formats.medium.url
                  : "/images/event-default.png"
              }
              width={960}
              height={600}
              alt="dj"
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}> {"<"} Go back</a>
        </Link>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: {
      slug: evt.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);

  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

export default EventPage;
