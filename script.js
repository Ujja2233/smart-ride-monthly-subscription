const plans = [
  {id:"essential",name:"Weekday Essential",price:3999,image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",description:"Perfect for your everyday office and college commute.",features:["Up to 22 travel days","Pickup and drop","Standard sedan","Monthly subscription"]},
  {id:"flex",name:"Smart Flex",price:4999,image:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",description:"More flexibility for your busy daily schedule.",features:["Up to 26 travel days","Pickup and drop","Executive vehicle","Flexible travel days"],popular:true},
  {id:"premium",name:"Premium Plus",price:6999,image:"https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=800&q=80",description:"Extra comfort and a premium travel experience.",features:["Up to 30 travel days","Pickup and drop","Premium SUV option","Flexible schedule"]}
];
const money = value => "₹" + Number(value).toLocaleString("en-IN");
function scrollToSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"});}
function displayPlans(){
  const grid=document.getElementById("plansGrid"),select=document.getElementById("planSelect");
  grid.innerHTML=plans.map(plan=>`<article class="plan-card ${plan.popular?"popular":""}">
    ${plan.popular?'<span class="popular-label">MOST POPULAR</span>':""}
    <img src="${plan.image}" alt="${plan.name}" loading="lazy"><h3>${plan.name}</h3>
    <div class="price">${money(plan.price)} <small>/month</small></div><p>${plan.description}</p>
    <ul>${plan.features.map(item=>`<li>${item}</li>`).join("")}</ul>
    <button class="btn primary" onclick="selectPlan('${plan.id}')">Select Plan ↗</button></article>`).join("");
  select.innerHTML='<option value="">Choose your plan</option>'+plans.map(plan=>`<option value="${plan.id}">${plan.name} - ${money(plan.price)}/month</option>`).join("");
}
function selectPlan(id){document.getElementById("planSelect").value=id;scrollToSection("booking");}
function getBookings(){try{return JSON.parse(localStorage.getItem("smartRideBookings")||"[]");}catch{return [];}}
function saveBookings(bookings){localStorage.setItem("smartRideBookings",JSON.stringify(bookings));}
function todayDate(){const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().split("T")[0];}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}
function showToast(text){const toast=document.getElementById("toast");if(!toast)return;toast.textContent=text;toast.classList.add("show");window.clearTimeout(showToast.timer);showToast.timer=window.setTimeout(()=>toast.classList.remove("show"),2500);}
function displayBookings(){
  const list=document.getElementById("bookingList"),bookings=getBookings();
  if(!bookings.length){list.innerHTML='<div class="empty">No bookings available. Book your first SmartRide subscription!</div>';return;}
  list.innerHTML=bookings.slice().reverse().map(b=>`<div class="booking-item"><div>
    <strong>${escapeHTML(b.name)}</strong><small>${escapeHTML(b.planName)}</small>
    <small>${escapeHTML(b.pickup)} → ${escapeHTML(b.drop)}</small>
    <small>${escapeHTML(b.city)} · ${escapeHTML(b.vehicle)}</small>
    <small>${escapeHTML((b.days||[]).join(", "))}</small>
    <small>Pickup: ${escapeHTML(b.time)} · Start: ${escapeHTML(b.startDate)}</small></div>
    <div><div class="booking-status">● REQUEST SAVED</div><small>${money(b.price)}/month</small>
    <button class="remove-btn" onclick="removeBooking('${escapeHTML(b.id)}')">Remove</button></div></div>`).join("");
}
function removeBooking(id){saveBookings(getBookings().filter(b=>String(b.id)!==String(id)));displayBookings();showToast("Booking removed!");}
function clearBookings(){if(!getBookings().length){showToast("No bookings to clear!");return;}if(confirm("Do you want to remove all bookings?")){saveBookings([]);displayBookings();showToast("All bookings removed!");}}
document.addEventListener("DOMContentLoaded",()=>{
  displayPlans();displayBookings();
  const dateInput=document.getElementById("startDate");
  dateInput.min=todayDate();dateInput.value=todayDate();
  document.getElementById("bookingForm").addEventListener("submit",event=>{
    event.preventDefault();
    const name=document.getElementById("name").value.trim(),phone=document.getElementById("phone").value.trim();
    const city=document.getElementById("city").value,vehicle=document.getElementById("vehicle").value;
    const pickup=document.getElementById("pickup").value.trim(),drop=document.getElementById("drop").value.trim();
    const time=document.getElementById("time").value,startDate=dateInput.value,planId=document.getElementById("planSelect").value;
    const selectedDays=[...document.querySelectorAll(".days input:checked")].map(x=>x.value);
    const plan=plans.find(x=>x.id===planId),message=document.getElementById("message");
    message.classList.remove("show");message.textContent="";
    if(!/^[6-9][0-9]{9}$/.test(phone)){message.textContent="Please enter a valid 10-digit Indian mobile number.";message.classList.add("show");return;}
    if(!plan){message.textContent="Please select a subscription plan.";message.classList.add("show");return;}
    if(!selectedDays.length){message.textContent="Select at least one travel day.";message.classList.add("show");return;}
    if(!startDate||startDate<todayDate()){message.textContent="Please choose today or a future date.";message.classList.add("show");return;}
    const booking={id:Date.now().toString(),name,phone,city,vehicle,pickup,drop,time,startDate,planName:plan.name,price:plan.price,days:selectedDays,createdAt:new Date().toISOString()};
    const bookings=getBookings();bookings.push(booking);saveBookings(bookings);
    message.innerHTML=`<strong>Subscription request saved successfully!</strong><br>Welcome ${escapeHTML(name)}!<br>Plan: ${escapeHTML(plan.name)}<br>Monthly amount: ${money(plan.price)}<br>Reference: SR-${booking.id.slice(-6)}<br><small>This is a demo request, not a confirmed ride.</small>`;
    message.classList.add("show");displayBookings();showToast("Booking request saved!");
    event.target.reset();dateInput.min=todayDate();dateInput.value=todayDate();document.getElementById("city").value="Ramgarh";
  });
});
window.scrollToSection=scrollToSection;window.selectPlan=selectPlan;window.removeBooking=removeBooking;window.clearBookings=clearBookings;window.showToast=showToast;
