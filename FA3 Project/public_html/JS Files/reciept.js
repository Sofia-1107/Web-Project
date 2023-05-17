function begin()
{
    var subtotal = 0;
    var x = unescape(window.location.href).split("?orderSummary=")[1].split("!!!!&");
    var y = x[0].split("!!!!tip")[0].split("&");
    x = x[x.length-1].split("&");
    var table = document.getElementById("table").innerHTML;
    for (var i = 0; i < y.length - 3; i++) //last four elements of array y are tip, dateAndTime, TID
    {
        y[i] = y[i].split('=')[1];
        var z = y[i].split('!'); //z[0]-->name, z[1]-->val or quantity, z[2]-->price per item
        table = table + "<tr>\n\
                            <td  style='border-left:none;padding: 15px;'><img class='vegicon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/768px-Indian-vegetarian-mark.svg.png'> " + unescape(z[0]) + "</td>\n\
                            <td class='right' style='padding: 15px;'>&#8377; " + z[2] + "</td>\n\
                            <td class='right' style='padding: 15px;'>" + z[1] + "</td>\n\
                            <td class='right' style='border-right:none;padding: 15px;'>&#8377; " + z[1] * z[2] + "</td>\n\
                        </tr>";
        subtotal += (z[1] * z[2]);
    }
    var tax = 5 / 100 * subtotal;
    var tip = y[y.length - 3].split("=")[1];
    document.getElementById("TD").innerHTML = (y[y.length - 2].split("=")[1]).replace("+"," ");
    document.getElementById("TID").innerHTML = y[y.length - 1].split("=")[1];
            table = table + "<tr>\n\
                    <td colspan='2' style='border:0px;'></td>\n\
                    <td class='right' style='border-left:none;padding: 15px;'>Subtotal</td>\n\
                    <td class='right'  style='border-right:none;padding: 15px;'>&#8377;  " + subtotal + "</td>\n\
                </tr>\n\
                <tr>\n\
                    <td colspan='2' style='border:0px;'></td>\n\
                    <td class='right' style='border-left:none;padding: 15px;'>Taxes And Charges</td>\n\
                    <td class='right' style='border-right:none;padding: 15px;'>&#8377;  " + Math.floor(tax * (100)) / 100 + "</td>\n\
                </tr>";
    if (tip > 0)
    {
        table = table + "<tr>\n\
                    <td colspan='2' style='border:0px;'></td>\n\
                    <td class='right' style='border-left:none;padding: 15px;'>Tip For Our Rider</td>\n\
                    <td class='right' style='border-right:none;padding: 15px;'>&#8377;  " + tip + "</td>\n\
                </tr>";
    }
    table = table + "<tr>\n\
                    <td colspan='2' style='border:0px;'></td>\n\
                    <td class='right' style='border-left:none;padding: 15px;'><b>Total Amount Paid</b></td>\n\
                    <td class='right' style='border-right:none;padding: 15px;'><b>&#8377;  " + Math.floor((subtotal + tax + tip) * 100) / 100 + "</b></td>\n\
                </tr>";
    document.getElementById("table").innerHTML = table;
    var content;
    var paymentIndex=x[0].split("=")[1];
    if(paymentIndex==="card") //payment done by card
    {
        content="Payment Method: card<br>\n\
                Card Number: xxxx xxxx xxxx "+(String(x[7]).split("=")[1]).substring(12,16)+"<br>\n\
                Name on Card: "+x[8].split("=")[1]+"<br>\n\
                Card Expiry: "+x[9].split("=")[1]+"/"+x[10].split("=")[1];
    }
    else if(paymentIndex==="paytm")//payment done by paytm
    {
        content="Payment Method: Paytm Wallet<br>\n\
                Mobile Number: xxx xxx "+x[7].split("=")[1].substring(6,10);
    }
    else if(paymentIndex==="upi")//payment done by upi
    {
        content="Payment Method: UPI<br>\n\
                UPI ID: "+String(x[7]).split("=")[1];
    }
    document.getElementById("paymentDetails").innerHTML=content;
    
    content=x[4].split("=")[1]+"<br>"+x[5].split("=")[1]+"<br>"+x[6].split("=")[1];
    document.getElementById("deliveryAddress").innerHTML=content;
}

function printReciept()
{
    document.getElementById("buttons").style.display="none";
    window.print();
    document.getElementById("buttons").style.display="block";
}