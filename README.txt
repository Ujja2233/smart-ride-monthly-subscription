SMART RIDE - COMPLETE FRONTEND DEMO
====================================

START HERE
- index.html: Main SmartRide marketing/home page with services, fleet, subscription plans,
  booking form, My Bookings, and FAQ.
- portal.html: Role selection page (Continue as).

ROLE DASHBOARDS (each opens as a separate page)
- user.html
- driver.html
- vehicle-owner.html
- management.html
- admin.html

STYLES AND SCRIPTS
- landing.css: Homepage-only styles.
- script.js: Homepage subscription plans, booking form, LocalStorage booking list.
- style.css: Role portal and role dashboard styles.
- app.js: Role dashboard data and interactions.

HOW TO RUN
1. Extract the ZIP file.
2. Open the folder in Visual Studio Code.
3. Install the Live Server extension if it is not installed.
4. Right-click index.html and choose "Open with Live Server".
5. Use the "Dashboards" link in the navbar or footer to open portal.html.
6. Choose a role. Each role opens its own HTML page.
7. Use "Change role" to return to portal.html.

HOMEPAGE FEATURES
- Responsive landing page, hero image, services and vehicle gallery.
- Three dynamic monthly subscription plans.
- Select Plan button fills the booking form's plan selection.
- Booking form validation for Indian mobile number, date and travel days.
- Booking requests are saved in browser LocalStorage.
- My Bookings list supports removing one or clearing all bookings.

DASHBOARD FEATURES
- Separate User, Driver, Vehicle Owner, Management and Admin pages.
- Demo trip status updates, admin plan price changes, CSV report export.
- Dashboard sample data is saved locally in browser LocalStorage.

IMPORTANT
This is a frontend-only college/demo prototype. It has no real authentication, server database,
payment gateway, GPS tracking, or real driver dispatch. All people, trips, revenue and payment
records shown in the dashboards are sample data. Homepage booking requests are local demo
requests and are not confirmed rides. External car images and Google Fonts require internet.
