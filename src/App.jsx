import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import grandnational from '/img/grandnational.jpg';


function App() {

//endpoint!
const API_URL = process.env.API_URL || "https://nscc-w0443022-api-inft4000-700-ejbkhbf9hwhgf6g6.canadacentral-01.azurewebsites.net/api/tickets"

  // Concert details
  const concertDetails = {
    id: 1,
    title: "Kendrick Lamar & SZA - Grand National Tour",
    date: "June 15, 2025",
    venue: "Rogers Centre, Toronto",
    quantity: 10,
    price: 300.99,
    fees: 25.50
  };

  // all data in form (with appropriate hardcoded values)
  const [formData, setFormData] = useState({
    ConcertId: concertDetails.id,
    Name: '',
    Email: '',
    Phone: '',
    CreditCard: '',
    Expiration: '',
    Cvv: '',
    Address: '',
    City: '',
    Province: '',
    PostalCode: '',
    Country: '',
    Quantity: concertDetails.quantity
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Format credit card by removing spaces
      const payload = {
        ...formData,
        CreditCard: formData.CreditCard.replace(/\s+/g, ''),
        ConcertId: concertDetails.id,
        Quantity: concertDetails.quantity
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Purchase failed');
      }

      const result = await response.text();
    console.log('API Response:', result);
    alert('Purchase successful! Check your email for confirmation.');
    
    // Reset form after successful submission
    setFormData({
      ...formData,
      Name: '',
      Email: '',
      Phone: '',
      CreditCard: '',
      Expiration: '',
      Cvv: '',
      Address: '',
      City: '',
      Province: '',
      PostalCode: '',
      Country: ''
    });

  } catch (error) {
    console.error('API Error:', error);
    let errorMessage = 'Purchase failed. Please try again.';
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      errorMessage = 'Network error. Please check your connection.';
    } else if (error.message.includes('CORS')) {
      errorMessage = 'Server configuration issue. Please contact support.';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    setError(errorMessage);
    alert(`Error: ${errorMessage}`);
  } finally {
    setIsSubmitting(false);
  }
};

  // Calculate totals
  const subtotal = concertDetails.price * concertDetails.quantity;
  const total = subtotal + concertDetails.fees;

  // Canadian provinces for dropdown
  const canadianProvinces = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'YT', name: 'Yukon' }
  ];

  return (
    <div className="container-fluid p-0" style={{ maxWidth: '1300px', margin: '0 auto' }}>
      
      {/* Concert Image */}
      <div className="row g-0">
        <div className="col-12">
          <img 
            src={grandnational}
            alt="Kendrick Lamar & Sza - Grand National Tour" 
            className="img-fluid w-100"
            style={{ 
              height: '40vh',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="row g-0 justify-content-center bg-white">
        {/* Order Summary Column */}
        <div className="col-12 col-lg-4 p-4 p-md-5 bg-light">
          <div className="sticky-top" style={{ top: '20px' }}>
            <h2 className="mb-4" style={{ 
              fontSize: '1.25rem',
              fontWeight: '300',
              letterSpacing: '1px',
              color: '#555'
            }}>
              ORDER SUMMARY
            </h2>

            <div className="mb-4">
              <h3 className="h5">{concertDetails.title}</h3>
              <p className="text-muted small mb-1">{concertDetails.date}</p>
              <p className="text-muted small">{concertDetails.venue}</p>
            </div>

            <hr className="my-4" />

            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tickets</span>
                <span>{concertDetails.quantity} × ${concertDetails.price.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Fees</span>
                <span>${concertDetails.fees.toFixed(2)}</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-between fw-bold">
              <span>TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-5 pt-4">
              <p className="small text-muted">
                <i className="bi bi-lock-fill me-2"></i>
                Your information is secure and will not be shared.
              </p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="col-12 col-lg-8 p-4 p-md-5">
          <div className="text-center mb-5">
            <h1 className="mb-3" style={{ 
              fontSize: '2rem', 
              letterSpacing: '2px',
              fontWeight: '300',
              color: '#333'
            }}>
              CONFIRM YOUR PURCHASE
            </h1>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Check your email for confirmation</p>
          </div>

          <form onSubmit={handleSubmit} className="px-2">
            <div className="row">
              {/* Customer Info */}
              <div className="col-md-6 pe-md-4">
                <h2 className="mb-4" style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '300',
                  letterSpacing: '1px',
                  color: '#555'
                }}>
                  CUSTOMER INFORMATION
                </h2>
                
                {['Name', 'Email', 'Phone', 'Address', 'City'].map((field) => (
                  <div className="mb-4" key={field}>
                    <label className="form-label text-uppercase small text-muted" style={{ letterSpacing: '1px' }}>
                      {field}
                    </label>
                    <input
                      type={field === 'Email' ? 'email' : 'text'}
                      name={field}
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 px-0"
                      style={{ borderBottom: '1px solid #ddd' }}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              <div className="col-md-6 ps-md-4">
                <h2 className="mb-4" style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '300',
                  letterSpacing: '1px',
                  color: '#555'
                }}>
                  PAYMENT DETAILS
                </h2>
                
                <div className="mb-4">
                  <label className="form-label text-uppercase small text-muted" style={{ letterSpacing: '1px' }}>Credit Card</label>
                  <input
                    type="text"
                    name="CreditCard"
                    className="form-control rounded-0 border-top-0 border-start-0 border-end-0 px-0"
                    style={{ borderBottom: '1px solid #ddd' }}
                    placeholder="•••• •••• •••• ••••"
                    value={formData.CreditCard}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-6 mb-4">
                    <label className="form-label text-uppercase small text-muted" style={{ letterSpacing: '1px' }}>Expiration</label>
                    <input
                      type="text"
                      name="Expiration"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 px-0"
                      style={{ borderBottom: '1px solid #ddd' }}
                      placeholder="MM/YY"
                      value={formData.Expiration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-6 mb-4">
                    <label className="form-label text-uppercase small text-muted" style={{ letterSpacing: '1px' }}>CVV</label>
                    <input
                      type="text"
                      name="Cvv"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 px-0"
                      style={{ borderBottom: '1px solid #ddd' }}
                      placeholder="•••"
                      value={formData.Cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label text-uppercase small text-muted" style={{ letterSpacing: '1px' }}>Province</label>
                  <select
                    name="Province"
                    className="form-control rounded-0 border-top-0 border-start-0 border-end-0 px-0"
                    style={{ borderBottom: '1px solid #ddd' }}
                    value={formData.Province}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Province</option>
                    {canadianProvinces.map(province => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label text-uppercase small text-muted" style={{ letterSpacing: '1px' }}>Postal Code</label>
                  <input
                    type="text"
                    name="PostalCode"
                    className="form-control rounded-0 border-top-0 border-start-0 border-end-0 px-0"
                    style={{ borderBottom: '1px solid #ddd' }}
                    placeholder="e.g. M5V 3L9"
                    value={formData.PostalCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-uppercase small text-muted" style={{ letterSpacing: '1px' }}>Country</label>
                  <input
                    type="text"
                    name="Country"
                    className="form-control rounded-0 border-top-0 border-start-0 border-end-0 px-0"
                    style={{ borderBottom: '1px solid #ddd' }}
                    value={formData.Country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="d-grid mt-5">
              <button 
                type="submit" 
                className="btn btn-dark rounded-0 py-3 text-uppercase"
                style={{ 
                  letterSpacing: '2px',
                  fontWeight: '300',
                  fontSize: '0.9rem',
                  backgroundColor: '#000',
                  border: 'none'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Complete Purchase'}
              </button>
            </div>

            {error && (
              <div className="mt-3 alert alert-danger">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;