import React, { useEffect, useState } from "react";

const InquiryList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  useEffect(() => {
    fetch(`${apiUrl}/getInqueries.php`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vehicles.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-list">
      <h1>Inquiries Information</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year From</th>
            <th>Year To</th>
            <th>Price From</th>
            <th>Price To</th>
            <th>Body Type</th>
            <th>Mileage From</th>
            <th>Mileage To</th>
            <th>Transmission</th>
            <th>Steering</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentVehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year_from}</td>
              <td>{vehicle.year_to}</td>
              <td>{vehicle.price_from}</td>
              <td>{vehicle.price_to}</td>
              <td>{vehicle.body_type}</td>
              <td>{vehicle.mileage_from}</td>
              <td>{vehicle.mileage_to}</td>
              <td>{vehicle.transmission}</td>
              <td>{vehicle.steering}</td>
              <td>{vehicle.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {/* Pagination controls */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InquiryList;
