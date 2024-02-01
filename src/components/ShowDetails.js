import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import imgDef from '../images/tv-show.png';

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBookTickets = () => {
    navigate(`/book/${id}`, { state: { show } });
  };

  return (
    <div className="container my-4" style={{backgroundColor: "#0C4160", color: "#C3CEDA"}}>
      {show && (
        <div>
          <div className='d-flex py-2 my-2'><h1 className='mx-auto'>{show.name || ''}</h1></div>
          <div className="row d-flex flex-column align-items-center">
            <div className="col-md-4 py-2">
              <img src={show.image?.original || imgDef} alt={show.name || ''} className="img-fluid" />
            </div>
            <div className="col-md-8 py-2">
            <p><strong>Summary:</strong></p>
              <div dangerouslySetInnerHTML={{ __html: show.summary }} />
              <p>
                <strong>Genres:</strong> {show.genres.join(', ')}
              </p>
              <p>
                <strong>Language:</strong> {show.language}
              </p>
              <p>
                <strong>Status:</strong> {show.status}
              </p>
              <p>
                <strong>Rating:</strong> {show.rating.average}
              </p>
              <p>
                <strong>Network:</strong> {show.network?.name || ''}
              </p>
              <a href={show.officialSite} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", color: "#C3CEDA"}}>
                Official Site
              </a>
            </div>
              <div className='d-flex'><button className="btn btn-primary mt-3 mx-auto my-3" onClick={handleBookTickets} style={{maxWidth: "300px"}}>
                Book Tickets
              </button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;