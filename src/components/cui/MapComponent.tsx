const MapComponent = () => {
  return (
    <div className="my-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d937.0021684434525!2d90.39570910029248!3d23.799119028445354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c719eff3f473%3A0x34e2a229bd80af0a!2sKurmitola%20Golf%20Club!5e1!3m2!1sen!2sbd!4v1779093512348!5m2!1sen!2sbd"
        width="60%"
        height="550"
        className="mx-auto rounded-md"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapComponent;
