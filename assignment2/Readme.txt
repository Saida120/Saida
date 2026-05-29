Marz Reserve - COS10005 Assignment 2

Website structure
-----------------
assignment2 

- index.html: Home page introducing the platform, purpose, target users, services and a featured restaurant.
- restaurants.html: Listing page with six restaurants, cuisine type, signature dishes with prices, descriptions, images, average price ranges and reservation deposits.
- recommend.html: Recommendation page with a form for dietary preference, budget and dining purpose. JavaScript displays suitable restaurants and passes the selected restaurant to reservation.html.
- register.html: User registration page with JavaScript validation.
- reservation.html: Reservation form with restaurant prefill, dynamic deposit update, payment method logic and Mercury POST action.
- bill.html: Optional bonus estimated bill calculator page.
- css/style.css: External stylesheet linked to all pages. It contains layout, typography, colour palette, responsive rules, accessibility-focused contrast and animation styles.
- js/script.js: External JavaScript linked to all pages. It contains navigation highlighting, mobile menu, reveal animations, recommendation rules, form validation, deposit logic, payment logic and bill calculator logic.
- images/: Logo and restaurant images.

JavaScript validation 
---------------------
Registration form:
- Blocks submission until all required fields are valid.
- Username must be at least 5 characters and only use letters, numbers and underscores.
- Email must match a standard email format.
- Phone number must contain only digits and be 8 to 15 digits long.
- Password must be at least 10 characters and include uppercase, lowercase, number and special character.
- Confirm password must match the password.
- Gender, dietary preference and country/region must be selected.
- Error messages are displayed beside the relevant field.

Reservation form:
- Blocks submission until required fields are valid.
- Email and billing email must use a valid email format.
- Phone number must contain at least 10 digits.
- Reservation date and time must not be in the past.
- Number of people must be greater than 0.
- Restaurant selection updates the deposit amount dynamically.
- If Voucher is selected, the voucher code field appears and credit card fields are hidden.
- If Online payment is selected, credit card fields appear. Visa and Mastercard require 16 digits, while Amex requires 15 digits. This is only format checking using fake card information.
- The Same as email checkbox copies the booking email into the billing email field.

Recommendation logic:
- Each restaurant has tags for dietary fit, price level and dining purpose.
- The recommendation form scores restaurants based on dietary preference, budget range and dining purpose.
- The highest scoring restaurants are displayed with reasons and a Select and reserve link.

Known issues or limitations
---------------------------
- This is a front-end coursework prototype only. No real accounts, real restaurant bookings, real payment processing or database storage are implemented.
- Menu prices and deposits are used as realistic sample data for the assignment and may change on official restaurant websites.
- Users should use fake card information only when testing the online payment option.
- The reservation and registration forms submit to the required Mercury test URL after validation.

References
----------
Main restaurant list and restaurant images:
- Man of Many, "15 Best Fine Dining Restaurants in Melbourne", updated 17 September 2025: https://manofmany.com/culture/food/fine-dining-melbourne
- Yugen Dining image: https://manofmany.com/wp-content/uploads/2024/01/15-Best-Fine-Dining-Restaurants-in-Melbourne-2024-Yugen-Dining.jpg
- Minamishima image: https://manofmany.com/wp-content/uploads/2024/01/15-Best-Fine-Dining-Restaurants-in-Melbourne-2024-Minamishima.jpg
- Nomad image: https://manofmany.com/wp-content/uploads/2024/01/15-Best-Fine-Dining-Restaurants-in-Melbourne-2024-Nomad.jpg
- Ides image: https://manofmany.com/wp-content/uploads/2024/01/15-Best-Fine-Dining-Restaurants-in-Melbourne-2024-Ides.jpg
- Lona Misa image: https://manofmany.com/wp-content/uploads/2024/01/15-Best-Fine-Dining-Restaurants-in-Melbourne-2024-Lona-Misa.jpg
- Il Bacaro image: https://manofmany.com/wp-content/uploads/2024/01/15-Best-Fine-Dining-Restaurants-in-Melbourne-2024-Il-Bacaro.jpg

Additional menu and price references used for realistic sample data:
- NOMAD Melbourne official menu: https://nomad.melbourne/
- Yugen Dining official food page: https://yugendining.com.au/food
- Yugen Dining food menu PDF: https://yugendining.com.au/pdf/Yugen%20Dining%20Food%20Menu.pdf
- Minamishima official website: https://minamishima.com.au/
- Ides official dining page: https://idesmelbourne.com.au/dining/
- Ides "The Six" menu page: https://idesmelbourne.com.au/menu/the-six-2/
- Il Bacaro official menu: https://www.ilbacaro.com.au/menu

Logo
----
The Marz Reserve logo was created specifically for this coursework website using an original monogram design.

GitHub Link
-----------

https://github.com/Saida120/Saida.git


