import React from "react";

const imgData = ["FL_img1.jpg", "S&S_img2.jpg", "Visa_Consult.jpg", "World_Tour.jpg"];

const ImageCard = ({ imgSrc, position }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: position === 'left' ? 'row' : 'row-reverse',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '80vw',      // Card width is 80% of the viewport width
        height: '300px',    // Set a fixed height for uniformity
        margin: '10px',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flexBasis: '50%', height: '100%' }}>
        <img
          src={imgSrc}
          alt="Card"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '5px',
            objectFit: 'cover',
          }}
        />
      </div>
      <div style={{ flexBasis: '50%', padding: '0 15px' }}>
        <h4>Card Title</h4>
        <p>Description text for the card goes here.</p>
      </div>
    </div>
  );
};

const ImageCardList = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , background:'#e8f6f3' }}>
      {imgData.map((img, index) => (
        <ImageCard
          key={index}
          imgSrc={process.env.PUBLIC_URL + '/' + img} // Ensure images are in the public folder
          position={index % 2 === 0 ? 'right' : 'left'}
        />
      ))}
    </div>
  );
};

export default ImageCardList;
