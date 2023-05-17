var subtotal = 0;
var grandtotal = 0;
var tip = 0;
var b, x;
function begin() {
    x = window.location.href;
    x = x.split('?')[1];
    document.getElementById("textarea").innerHTML = x;
    var y = x.split('&');
    var a = document.getElementById("table").innerHTML;
    for (var i = 0; i < y.length - 1; i++)
    {
        y[i] = y[i].split('=')[1];
        var z = y[i].split('!');//z[0]-->name, z[1]-->val or quantity, z[2]-->price per item
        a = a + "<div class='row'>\n\
                    <div class='col-sm-1 vegiconProp'><img class='vegicon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/768px-Indian-vegetarian-mark.svg.png'></div>\n\
                    <div class='name col-sm-8'>" + unescape(z[0]) + " [x" + z[1] + "]<br><span class='subprice'>&#8377;" + z[2] + "</span></div>\n\
                    <div class='col-sm-3 price'>&#8377;" + (z[1] * z[2]) + "</div>\n\
                </div>";
        subtotal += (z[1] * z[2]);
    }
    var tax = subtotal * 5 / 100;
    grandtotal += (subtotal + tax);
    document.getElementById("table").innerHTML = a;
    document.getElementById("subtotal").innerHTML = "&#8377;&nbsp;" + subtotal;
    document.getElementById("tax").innerHTML = "&#8377;&nbsp;" + tax;
    document.getElementById("grandtotal").innerHTML = "<b>&#8377;&nbsp;" + grandtotal + "</b>";
}
function paymentMethod(a)
{
    var b = ["card", "paytm", "upi"];
    for (var i = 0; i < 3; i++)
    {
        if (b[i] === a) {

            displayPaymentInputs(a);
            openedPaymentInput = b[i];
        } else {
            var node = document.getElementById(b[i]);
            while (node.hasChildNodes()) {
                node.removeChild(node.lastChild);
            }
        }
    }
}
function displayPaymentInputs(a)
{
    var content;
    if (a == "card")
        content = '<div>\n\
                        <div class="form-group" style="margin-top:20px;">\n\
                            <label class="col-sm-3">Card Number</label>\n\
                            <div class="col-sm-7"><input type="number" class="form-control input-lg" name="cardNumber" min=1000000000000 max=9999999999999999 required></div>\n\
                        </div>\n\
                        <div class="form-group">\n\
                            <label class="col-sm-3">Name on card:</label>\n\
                            <div class="col-sm-7"><input type="text" class="form-control input-lg" name="cardName" required></div>\n\
                        </div>\n\
                        <div class="form-group">\n\
                            <label class="col-sm-3">Expiration Month/Year</label>\n\
                            <div class="col-sm-3"><input type="number" class="form-control input-lg" name="expMonth" placeholder="MM" min=01 max=12 required></div>\n\
                            <div class="col-sm-4"><input type="number" class="form-control input-lg" name="expYr" placeholder="YYYY" min=2020 max=2040 required>\n\</div>\n\
                        </div>\n\
                        <div class="form-group">\n\
                            <label class="col-sm-3">CVV Number</label>\n\
                            <div class="col-sm-7"><input type="number" class="form-control input-lg" name="cvv" min=100 max=9999 required></div>\n\
                        </div>\n\
                    </div>';
    else if (a === "paytm")
        content = '<div class="form-group" style="margin-top:20px;">\n\
                        <label class="col-sm-3">Mobile Number Linked to paytm:</label>\n\
                        <div class="col-sm-2"><input type="text" value="+91" class="form-control input-lg"  disabled></div>\n\
                        <div class="col-sm-5"><input type="number" class="form-control input-lg" name="paytmNumber" min=1000000000 max=9999999999 required></div>\n\
                   </div>';
    else if(a==="upi")
        content = "<div class='form-group' style='margin-top:20px;'>\n\
                        <label class='col-sm-3'>Enter Your UPI Id:</label>\n\
                        <div class='col-sm-7'><input type='text' class='form-control input-lg' name='upi' required></div>\n\
                    </div>";

    document.getElementById(a).innerHTML = content;
    window.scrollTo(0,document.body.scrollHeight);
}
function addTip(b)
{
    tip = tip + b;
    grandtotal = grandtotal + tip;
    document.getElementById("tipDiv1").style.display = "block";
    document.getElementById("tip1").innerHTML = "&#8377;&nbsp;" + tip;
    document.getElementById("tipDiv2").style.display = "block";
    document.getElementById("tip2").innerHTML = "&#8377;&nbsp;" + tip;
    document.getElementById("grandtotal").innerHTML = "<b>&#8377;&nbsp;" + grandtotal + "</b>";
}
function clearTip()
{
    grandtotal = grandtotal - tip;
    tip = 0;
    document.getElementById("tipDiv1").style.display = "none";
    document.getElementById("tipDiv2").style.display = "none";
    document.getElementById("grandtotal").innerHTML = "<b>&#8377;&nbsp;" + grandtotal + "</b>";
}
function reciept()
{
    if (openedPaymentInput !== -1)
    {
        document.getElementById("paymentIndex").innerHTML=openedPaymentInput;
        var b = document.getElementById("textarea");

        var d = new Date();
        var month;
        if (d.getMonth() === 0) month = "Jan";
        else if (d.getMonth() === 1) month = "Feb";
        else if (d.getMonth() === 2) month = "Mar";
        else if (d.getMonth() === 3) month = "Apr";
        else if (d.getMonth() === 4) month = "May";
        else if (d.getMonth() === 5) month = "Jun";
        else if (d.getMonth() === 6) month = "Jul";
        else if (d.getMonth() === 7) month = "Aug";
        else if (d.getMonth() === 8) month = "Sep";
        else if (d.getMonth() === 9) month = "Oct";
        else if (d.getMonth() === 10) month = "Nov";
        else month = "Dec";
        var TD = d.getDate() + "&nbsp;" + month + "&nbsp;" + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes();

        var TID = (String(Math.random())).substring(2, 11);

        b.innerHTML = b.innerHTML + "tip=" + tip + "&TD=" + TD + "&TID=" + TID + "!!!!";
    }
}