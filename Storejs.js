
const cards = document.querySelectorAll('.card'); //ให้นำองค์ประกอบการตกแต่งการ์ดมาจากไฟล์ css
const right_arrow = document.querySelector('.arrow.right'); //ให้นำองค์ประกอบการตกแต่งลูกศรด้านขวามาจากไฟล์ css
const left_arrow = document.querySelector('.arrow.left'); //ให้นำองค์ประกอบการตกแต่งลูกศรด้านซ้ายมาจากไฟล์ css

const shopping_cart = document.querySelector('.shopping-cart'); //ให้นำองค์ประกอบการตกแต่งตะกร้ามาจากไฟล์ css
const cart_btns = document.querySelectorAll('.add-to-cart'); //ให้นำองค์ประกอบการตกแต่งปุ่มตะกร้ามาจากไฟล์ css

let left = 0; //ประกาศตัวแปรให้ ซ้ายเท่ากับ 0
let card_size = 25.4;  //ประกาศตัวแปรให้ ขนาดการ์ดเท่ากับ 25.4
let total_card_size = cards.length * card_size - card_size * 4; //ประกาศตัวแปรให้ผลรวมของขนาดการ์ดเท่ากับ ความยาวของการ์ด*ขนาดการ์ด-(ขนาดการ์ด*4)

if (window.matchMedia('(max-width: 768px)').matches) { //ถ้าหน้าจอขนาดความกว้างสูงสุด 768 px 
    card_size = 52;
    total_card_size = cards.length * card_size - card_size * 2; 
}

left_arrow.onclick = () => { //เมื่อคลิกที่ไอคอนสูกศรซ้าย
    left -= card_size; //ให้ด้านซ้ายขนาดของการ์ดลดลง

    if (left <= 0) left = 0; //ถ้าซ้ายน้อยกว่าหรือเท่ากับ 0  โดยให้ซ้าย เท่ากับ 0
    moveCards(left); //การ์ดไปทางซ้าย
    checkArrowVisibility(left); //เช็คค่าลูกศรทางซ้าย
}

left_arrow.style.opacity = '0';//ลูกศรทางซ้ายหายไป

right_arrow.onclick = () => { //เมื่อคลิกลูกศรทางขวา
    left += card_size; //ให้ซ้ายมีขนาดการ์ดเพิ่มขึ้น

    if (left >= total_card_size) left = total_card_size;//ถ้าซ้ายมากกว่าหรือเท่ากับผลรวมของขนาดการ์ด โดยที่ซ้ายเท่ากับผลรวมของขนาดการ์ด
    moveCards(left);//การ์ดไปทางซ้าย
    checkArrowVisibility(left); //เช็คค่าลูกศรทางซ้าย
}

function moveCards(left) {//การ์ดเคลื่อนที่
    for (card of cards) {//ใช้คำสั่ง for of ในการวนลูปการ์ด
        card.style.left = -left + "%"; //โดยสไตลฺ์การ์ดด้านซ้ายเท่ากับซ้ายที่มีค่าติดลบบวก%
    }
}

function checkArrowVisibility(pos) { //เมื่อใช้ลูกศรเพื่อเลื่อนหน้า
    if (pos == 0) { //ป้อนคำสั่ง if else  ถ้าคลิกลูกศรทางซ้าย เพื่อเลื่อนหน้าสินค้าจนสุด 
        left_arrow.style.opacity = '0'; //ปุ่มลูกศรที่คลิกทางซ้ายจะหายไป 
    } else { //แต่ถ้ากดลูกศรไปทางขวา 
        left_arrow.style.opacity = '1'; //ปุ่มลูกศรทางซ้ายจะโผล่ขึ้นมา 
    }
    if (pos >= total_card_size) { //ถ้าคลิกลูกศรทางขวา เพื่อเลื่อนหน้าสินค้าจนสุด 
        right_arrow.style.opacity = '0'; //ปุ่มลูกศรที่คลิกทางขวาจะหายไป 
    } else { //แต่ถ้ากดลูกศรไปทางซ้าย 
        right_arrow.style.opacity = '1'; //ปุ่มลูกศรทางขวาจะโผล่ขึ้นมา
    }
}

// Fly To Shopping Cart Effect

for (cart_btn of cart_btns) { //ใช้คำสั่ง for of กับปุ่มตะกร้า
    cart_btn.onclick = (e) => { //เมื่อคลิกที่ปุ่มตะกร้า

        shopping_cart.classList.add('active');//เมื่อกดปุ่มเพิ่มลงตะกร้า

        let product_count = Number(shopping_cart.getAttribute('data-product-count')) || 0; //ให้สินค้าในตะกร้าเริ่มต้นเป็น 0
        shopping_cart.setAttribute('data-product-count', product_count + 1);//เมื่อกดปุ่มเพิ่มลงในตะกร้า เลขตรงตะกร้าจะเพิ่มขึ้นทีละ 1 

        // finding first grand parent of target button 
        let target_parent = e.target.parentNode.parentNode.parentNode;
        target_parent.style.zIndex = "100"; 
        // Creating separate Image
        let img = target_parent.querySelector('img');
        let flying_img = img.cloneNode();
        flying_img.classList.add('flying-img');

        target_parent.appendChild(flying_img);

        // Finding position of flying image

        const flying_img_pos = flying_img.getBoundingClientRect(); //ให้รูปสินค้าบิน
        const shopping_cart_pos = shopping_cart.getBoundingClientRect();//ให้รูปสินค้าใส่ในตะกร้า

        let data = { //ป้อนคำสั่งสำหรับการนำสินค้าใส่ตะกร้า
            left: shopping_cart_pos.left - (shopping_cart_pos.width / 2 + flying_img_pos.left + flying_img_pos.width / 2),
            top: shopping_cart_pos.bottom - flying_img_pos.bottom + 30
        }

        console.log(data.top); //ทดสอบการทำงานของdata.top

        flying_img.style.cssText = `
                                --left : ${data.left.toFixed(2)}px; 
                                --top : ${data.top.toFixed(2)}px;
                                `; //ขนาดข้อมูลตอนที่สินค้าลอยเมื่อนำเม้าท์วางไว้ที่สินค้า ทางซ้าย ขนาดของข้อความสามารถมีจุดทศนิยมได้2ตำแหน่งของหน่วย px และด้านบน ขนาดของข้อความสามารถมีจุดทศนิยมได้2ตำแหน่งของหน่วย px
         

        setTimeout(() => { //ให้โค้ตทำงานเมื่อเวลาผ่านไป
            target_parent.style.zIndex = "";
            target_parent.removeChild(flying_img); //ย้ายสินค้าไปใส่ตะกร้า
            shopping_cart.classList.remove('active'); //ตอนที่ย้ายสินค้าใส่ตะกร้า ให้หลังตะกร้าสินค้าลอยไปที่ช่องว่างเปล่าๆ
        }, 1000); //ในทุกๆ 1000 มิลลิวินาที
    }
}