import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import { parseCookie } from "../../helpers/index";
import DashboardEvent from "../../components/DashboardEvent";
import styles from "../../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const DashboardPage = ({ events, token }) => {
  const router = useRouter();
  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>Me events</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}

export default DashboardPage;
