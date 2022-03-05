import React from 'react';
import { useParams } from 'react-router-dom';


const Detail = () => {
  const { id } = useParams();
  return (
    <div>
      detail page입니당 : {id}
    </div>
  );
};

export default Detail;