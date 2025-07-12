(function() {
  emailjs.init("ozirpe4oDpR07zmlw");
})();

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_iecnrr8", "template_vjpm9uv", this)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully.',
        confirmButtonColor: '#3085d6'
      });
      this.reset();
    })
    .catch((error) => {
      console.error("Email send error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to send message. Please try again later.',
        confirmButtonColor: '#d33'
      });
    });
});
