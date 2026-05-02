$(document).ready(function () {

    const signInForm = document.getElementById("signinForm");
    const registerForm = document.getElementById("registerForm");
    const serviceForm = document.getElementById("serviceForm");
    const container = document.getElementsByClassName("form-container");
    let IsLoggedIn = false;
    // ---------------- Switch Forms ----------------
    document.getElementById("goToRegister").addEventListener("click", (event) => {
        event.preventDefault(); 
        signInForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        
    });

    document.getElementById("goToSignIn").addEventListener("click", (event) => {
        event.preventDefault(); 
        registerForm.classList.add("hidden");
        signInForm.classList.remove("hidden");
        
    });

    // --------------- SIGN IN ----------------
    signInForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        IsLoggedIn = true;

        alert("✅ You have successfully signed in!");

        // Optionally hide form and show a message
        signInForm.classList.add("hidden");
        container.velocity({opacity:0});
    });

    // ---------------- REGISTER ----------------
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        IsLoggedIn = true;

        alert("🎉 Account created successfully! You are now signed in.");

        registerForm.classList.add("hidden");
         container.velocity({opacity:0});
    });

    // ---------------- SERVICE REQUEST ----------------
    $("#serviceForm").on("submit", function (e) {
        e.preventDefault();

        // Check login status
        if (IsLoggedIn != true) {
            alert("⚠ You must be signed in to request a service.\nPlease sign in or create an account first.");

            document.getElementById("register").scrollIntoView({ behavior: "smooth" });
            return;
        }

        const name = $("#name").val();
        const phone = $("#phone").val();
        const vehicle = $("#vehicle").val();
        const service = $("#service").val();
        const location = $("#location").val();
        const urgency = $("#urgency").val();
        const message = $("#message").val();

        // Show confirmation
        alert(`Thank you ${name}! Your request for "${service}" has been received. We will contact you at ${phone}.`);

        this.reset();
    });


});

 $(document).ready(function () {

    const $sectionsToAnimate = $('#register, #form-section');
    const $car = $("#moving-car");

    $sectionsToAnimate.velocity({ opacity: 0 });

    function loopCar() {

        $car.css({ left: "-200px" });

        $car.velocity(
            { left: "100%" },
            {
                duration: 3500,
                easing: "easeOutQuad",
                delay:5000
               
            }
        );
    }

    function checkScrollForAnimation() {
        const viewportHeight = $(window).height();
        const windowScrollTop = $(window).scrollTop();

        $sectionsToAnimate.each(function () {
            const $el = $(this);

            if ($el.data('animated')) return;

            const elementOffsetTop = $el.offset().top;
            const triggerPoint = elementOffsetTop - (viewportHeight * 0.70);

            if (windowScrollTop > triggerPoint) {

                $el.data('animated', true);

                $el.velocity(
                    { opacity: 1 },
                    {
                        duration: 800,
                        easing: "easeInOutQuad"
                    }
                );

                

            }
        });
    }

    checkScrollForAnimation();
    loopCar(); 
    $(window).on('scroll', checkScrollForAnimation);

});

document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


$(document).ready(function () {
  // Toggle forms
  $('#goToRegister').click(function(e){
    e.preventDefault();
    $('#signinForm').addClass('hidden');
    $('#registerForm').removeClass('hidden');
  });
  $('#goToSignIn').click(function(e){
    e.preventDefault();
    $('#registerForm').addClass('hidden');
    $('#signinForm').removeClass('hidden');
  });

  // Register via AJAX
  $('#registerForm').on('submit', function(e){
    e.preventDefault();
    $.post('register.php', $(this).serialize(), function(resp){
      if (resp.success) {
        alert(resp.msg);
        $('#registerForm')[0].reset();
        $('#registerForm').addClass('hidden');
        $('#signinForm').removeClass('hidden');
      } else {
        alert(resp.msg);
      }
    }, 'json').fail(function(){ alert('Server error.'); });
  });

  // Login via AJAX
  $('#signinForm').on('submit', function(e){
    e.preventDefault();
    $.post('login.php', $(this).serialize(), function(resp){
      if (resp.success) {
        alert('Welcome, ' + resp.name);
        // optionally update UI to show logged-in state
      } else {
        alert(resp.msg);
      }
    }, 'json').fail(function(){ alert('Server error.'); });
  });

  // Submit service request via AJAX
  $('#serviceForm').on('submit', function(e){
    e.preventDefault();
    $.post('service_request.php', $(this).serialize(), function(resp){
      if (resp.success) {
        alert(resp.msg);
        $('#serviceForm')[0].reset();
      } else {
        alert(resp.msg);
      }
    }, 'json').fail(function(){ alert('Server error.'); });
  });
});
