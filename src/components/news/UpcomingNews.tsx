import React, { useEffect, useState } from 'react';
import { dbPromise } from '../contents/firebaseConfig'; // Adjust the import according to your file structure
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";

const UpcomingNews = () => {
  const [news, setNews] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchNews = async (page) => {
    setLoading(true);
    let q;
    const db = await dbPromise;

    if (page === 1) {
      q = query(collection(db, "news"), orderBy("timestamp", "desc"), limit(10));
    } else {
      q = query(
        collection(db, "news"),
        orderBy("timestamp", "desc"),
        startAfter(lastDoc),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(q);
    const newsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setNews(newsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Upcoming News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {news.map(item => (
            <li key={item.id}>
              <h2>{item.news}</h2>
              <p>{item.otherINFO}</p>
              <p>{new Date(item.timestamp.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default UpcomingNews;
