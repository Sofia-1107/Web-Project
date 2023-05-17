var items = 0;
var subtotal = 0;
function quantButton(a)//get group buttons instead of add button
{
    document.getElementById("add" + a).style.display = "none";
    document.getElementById("quant" + a).style.display = "block";
    document.getElementById("footer").style.display = "block";
    document.getElementById("val" + a).innerHTML = "1";
    items++;
    addInSubtotal(a);
}
function quantInc(a)
{
    var val = document.getElementById("val" + a).innerHTML;
    document.getElementById("val" + a).innerHTML = ++val;
    items++;
    addInSubtotal(a);
}
function quantDec(a)
{
    var val = document.getElementById("val" + a).innerHTML;
    if (val == 1)
    {

        document.getElementById("add" + a).style.display = "block";
        document.getElementById("quant" + a).style.display = "none";
    }
    document.getElementById("val" + a).innerHTML = --val;
    items--;
    if (items == 0)
    {
        deleteChild();
        document.getElementById("cart").style.display = "none";
        document.getElementById("cartHeader").style.display = "none";
        document.getElementById("footer").style.display = "none";
        enableBackground();
    }
    subInSubtotal(a);
}
function viewCart()
{
    if (document.getElementById("cart").style.display === "none")
    {
        document.getElementById("cart").style.display = "block";
        document.getElementById("cartHeader").style.display = "block";
        disableBackground();
        displayCartData();
    } else
    {
        document.getElementById("cart").style.display = "none";
        document.getElementById("cartHeader").style.display = "none";
        deleteChild();
        enableBackground();
    }
}
function displayCartData()
{
    var i;
    for (i = 1; i <= 40; i++)
    {
        if (document.getElementById("val" + i).innerHTML > 0)
        {
            var priceofi = +document.getElementById("price" + i).innerHTML;
            var quantofi = +document.getElementById("val" + i).innerHTML;
            var amount = priceofi * quantofi;
            var x = document.getElementById("cart").innerHTML;
            x = x + "<div class='row' id='sno" + i + "'>\n\
                        <div class='col-md-8'>" + String(document.getElementById("name" + i).innerHTML) + "</div>\n\
                        <div class='col-md-2'>\n\
                            <button onclick='quantDecFromCart(" + i + ")' style='color: red;'>-</button>\n\
                            <button id='cartval" + i + "' disabled='true'>" + document.getElementById("val" + i).innerHTML + "</button>\n\
                            <button onclick='quantIncFromCart(" + i + ")' style='color: red; '>+</button></div>\n\
                        <div class='col-md-2'>&#8377;<span id='amount" + i + "'>" + amount + "</span></div>\n\
                        <hr><hr>\n\
                    </div>";
            document.getElementById("cart").innerHTML = x;
        }
    }
}
function quantIncFromCart(a)
{
    var val = document.getElementById("cartval" + a).innerHTML;
    document.getElementById("cartval" + a).innerHTML = ++val;
    var v = document.getElementById("price" + a).innerHTML;
    document.getElementById("amount" + a).innerHTML = v * val;
    quantInc(a);
}
function quantDecFromCart(a)
{
    var val = document.getElementById("cartval" + a).innerHTML;
    if (val == 1)
    {
        var x = document.getElementById("sno" + a);
        x.style.display = "none";
        x.parentNode.removeChild(x);
    } else
    {
        document.getElementById("cartval" + a).innerHTML = --val;
        var v = document.getElementById("price" + a).innerHTML;
        document.getElementById("amount" + a).innerHTML = v * val;
    }
    quantDec(a);
}
function deleteChild()
{
    var e = document.getElementById("cart");
    var child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}
function disableBackground()
{
    var container = document.getElementById("container");
    container.style.opacity = "0.2";
    container.style.pointerEvents = "none";
}
function enableBackground()
{
    var container = document.getElementById("container");
    container.style.opacity = "1.0";
    container.style.pointerEvents = "all";
}
function addInSubtotal(a)
{
    subtotal += +document.getElementById("price" + a).innerHTML;
    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("items").innerHTML = items;
}
function subInSubtotal(a)
{
    subtotal -= +document.getElementById("price" + a).innerHTML;
    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("items").innerHTML = items;
}
function payment()
{

    var a = "payments.html?";
    for (var i = 1; i <= 40; i++)
    {
        var val = +document.getElementById("val" + i).innerHTML;
        if (val > 0)
        {
            a = a + "item" + i + "=";
            var name = document.getElementById("n" + i).innerHTML;
            var price = document.getElementById("price" + i).innerHTML;
            a = a + escape(name) + "!" + val + "!" + price;
            if (i !== 40)
            {
                a = a + "&";
            }
        }
        window.location.assign(a);
    }
}
function scrollToDiv(a)
{
    document.getElementById(a).scrollIntoView();
    if (a != "dessert")
        scrollBy(0, -220);
}
function begin()
{
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 1500,
        autoplayHoverPause: false
    });
}
function clearCart()
{
    document.getElementById("cart").style.display = "none";
    document.getElementById("cartHeader").style.display = "none";
    document.getElementById("footer").style.display = "none";
    enableBackground();
    for(var i=1;i<=41;i++)
    {
        document.getElementById("val" + i).innerHTML =0;
        document.getElementById("add" + i).style.display = "block";
        document.getElementById("quant" + i).style.display = "none";
    }
    items=0;
    subtotal=0;
    deleteChild();
}