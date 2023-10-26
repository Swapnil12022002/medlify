import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../func-components/Loader";

const DefaultLayout = lazy(() => import("./DefaultLayout"));

function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Suspense fallback={<Loader />}>
        <DefaultLayout />
      </Suspense>
    </>
  );
}

export default Dashboard;
