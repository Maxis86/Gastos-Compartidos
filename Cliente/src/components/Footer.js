import React from "react";


const Footer = () => {
  return (
    <>
      <footer className="pt-3 my-3  border-top bg-light " style={{borderRadius:10, display: 'flex', justifyContent:'center'}}>
        <div className="row">
          <div>
            <small className="d-block mb-3 text-muted">
              &copy;  - MACH/GC V01.1- maximilianochamarro@gmail.com 
            </small>
          </div>
        </div>
      </footer>
      
    </>
  );
};

export default Footer;
