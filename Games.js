
    window.onload = function(){ //โหลดหน้าเว็บ
            var c = document.querySelector("canvas"); //ใช้ฟังก์ชันจรวดจากไฟล์ css 
            var canvas = document.querySelector("canvas"); //ใช้ฟังก์ชันจรวดจากไฟล์ css 
            c.width = innerWidth;  //กำหนดให้ความกว้างของจรวดเท่ากับความกว้างภายในจรวด
            c.height = innerHeight;//ความสูงเท่ากับความสูงภายในจรวด
            c = c.getContext("2d");//ให้วาดจรวดเป็น 2 มิติ
          
            function startGame(){ //เริ่มเกม
            mouse = { //เม้าท์
              x: innerWidth/2, //แกน x เป็นความกว้างหาร2 
              y: innerHeight-10 //แกน y เป็นความสูง-10
            };
              
            touch = { //สัมผัส กด
              x: innerWidth/2,//แกน x เป็น ความกว้างหาร2
              y: innerHeight-10 //แกน y เป็น ความสูง-10
            };
              
            canvas.addEventListener("mousemove", function(event){ //เรียกใช้ฟังก์ชัน event เมื่อเม้าท์ขยับ
            mouse.x = event.clientX; //ถูกเรียกเมื่อเหตุการณ์กลับชี้เมาส์ไปที่หน้าเว็บเบราว์เซอร์ 
            });
            canvas.addEventListener("touchmove", function(event){ //เรียกใช้ฟังก์ชัน event เมื่อมีการสัมผัสเคลื่อนย้าย
              var rect = canvas.getBoundingClientRect();//คืนค่าให้จรวด
              var root = document.documentElement; //ส่งคืนให้ element
              var touch = event.changedTouches[0];
              var touchX = parseInt(touch.clientX);
              var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
              event.preventDefault();
              mouse.x = touchX;//เม้าท์แกน x เท่ากับ สัมผัสแกนx
              mouse.y = touchY;//เม้าท์แกน y เท่ากับ สัมผัสแกนy
            });
            var player_width = 50; //
            var player_height = 150;
            var playerImg = new Image();
            var score = 0;
            var health = 100;
            playerImg.src = "https://image.ibb.co/dfbD1U/heroShip.png";
            
            var _bullets = []; 
            var bullet_width = 8;
            var bullet_height = 6;
            var bullet_speed = 11;
          
            var _enemies = []; 
            var enemyImg = new Image();
            enemyImg.src = "https://i.ibb.co/0YgHvmx/enemy-fotor-20230927153748.png"
            var enemy_width = 80;
            var enemy_height = 80;
          
            var _healthkits = []; 
            var healthkitImg = new Image();
            healthkitImg.src = "https://image.ibb.co/gFvSEU/first_aid_kit.png";
            var healthkit_width = 50; 
            var healthkit_height = 50;
            
            function Player(x, y, width, height){
              this.x = x;
              this.y = y;
              this.width = width;
              this.height = height;
              
              this.draw = function(){
                c.beginPath();
                c.drawImage(playerImg, mouse.x-player_width, mouse.y-player_height); 
              };
              
              this.update = function(){
                this.draw();
              };
            }
            
            function Bullet(x, y, width, height, speed){
              this.x = x;
              this.y = y;
              this.width = width;
              this.height = height;
              this.speed = speed;
              
              this.draw = function(){
                c.beginPath();
                c.rect(this.x, this.y, this.width, this.height);
                c.fillStyle = "white";
                c.fill();
              };
              
              this.update = function(){
                this.y -= this.speed;
                this.draw();
              };
            }
            
            function Enemy(x, y, width, height, speed){
              this.x = x;
              this.y = y;
              this.width = width;
              this.height = height;
              this.speed = speed;
              
              this.draw = function(){
                c.beginPath();
                c.drawImage(enemyImg, this.x, this.y);
              };
              
              this.update = function(){
                this.y += this.speed;
                this.draw();
              };
            }
            
            function Healthkit(x, y, width, height, speed){//
              this.x = x;
              this.y = y;
              this.width = width;
              this.height = height;
              this.speed = speed;
              
              this.draw = function(){
                c.beginPath();
                c.drawImage(healthkitImg, this.x, this.y);
              };
              
              this.update = function(){
                this.y += this.speed;
                this.draw();
              };
            }
              
            var __player = new Player(mouse.x, mouse.y, player_width, player_height);
            
            function drawEnemies(){ //สร้างศัตรูแบบสุ่ม
              for (var _ = 0; _<2; _++){ // ใช้คำสั่ง for ให้สร้างศัตรูแบบวนลูปซ้ำๆ โดยประกาศให้ตัวแปร var เริ่มต้นเป็น 0 โดยมีค่าน้อยกว่าหรือเท่ากับ 2 มีค่าเพิ่มขึ้นทีละ 2 
                var x = Math.random()*(innerWidth-enemy_width);//กำหนดให้ var  x (แกนx) เท่ากับ สุ่มตัวเลข*ความกว้างหน้าต่างเว็บ-ความกว้างของศัตรู
                var y = -enemy_height; //กำหนดให้ var y (แกน y) เท่ากับ ความสูงของศัตรูที่มีค่าติดลบ 
                var width = enemy_width;//กำหนดให้ var width แทนความกว้างของศัตรู
                var height = enemy_height; //กำหนดให้var height แทนความสูงของศัตรู 
                var speed = Math.random()*2;//ให้ var speed เท่ากับ สุ่มตัวเลข*2
                var __enemy = new Enemy(x, y, width, height, speed); //ให้ var เท่ากับ ศัตรูตัวใหม่ที่เก็บค่าแกน x y ความกว้าง ความสูง ความเร็ว ของศัตรูตัวใหม่
                _enemies.push(__enemy);//จำนวนของศัตรูเพิ่มขึ้น
              }
            }setInterval(drawEnemies, 1200);//ให้โปรแกรมสร้างศัตรูในทุกๆ 1200 มิลลิวินาที
              
            function drawHealthkits(){ //สร้างกล่องยา
              for (var _ = 0; _<2; _++){ //ใช้คำสั่ง for ให้สร้างกล่องยาแบบสุ่ม วนลูปซ้ำๆ โดยประกาศให้ตัวแปร var เริ่มต้นเป็น 0 โดยมีค่าน้อยกว่าหรือเท่ากับ 2 มีค่าเพิ่มขึ้นทีละ 2 
                var x = Math.random()*(innerWidth-enemy_width);//ให้ var x(แกน x) เท่ากับ สุ่มตัวเลข*(ความกว้างของพ.ทหน้าต่างเว็บ-ความกว้างของศัตรู)
                var y = -enemy_height; //ให้ var y (แกน y) เท่ากับ ความสูงของศัตรูที่มีค่าติดลบ
                var width = healthkit_width;//กำหนดให้ var width แทนความกว้างของกล่องยา
                var height = healthkit_height;//กำหนดให้var height แทนความสูงของกล่องยา
                var speed = Math.random()*2.6; //ให้ var speed เท่ากับ สุ่มตัวเลข*2.6
                var __healthkit = new Healthkit(x, y, width, height, speed);//ให้ var เท่ากับ กล่องยากล่องใหม่ที่เก็บค่าแกน x y ความกว้าง ความสูง ความเร็วของกล่องยากล่องใหม่
                _healthkits.push(__healthkit); //จำนวนของกล่องยาเพิ่มขึ้น
              }
            }setInterval(drawHealthkits, 15000);//ให้โปรแกรมสร้างกล่องยาในทุกๆ 15000 มิลลิวินาที
          
            function fire(){ //การยิงปืน
              for (var _ = 0; _<1; _++){ // ใช้คำสั่ง for ในการวนลูปให้ทำงานซ้ำๆ ตามเงื่อนไขที่กำหนด โดยประกาศให้ตัวแปร var เริ่มต้นเป็น 0  โดยที่ต้องมีค่าน้อยกว่าหรือเท่ากับ1 มีค่าเพิ่มขึ้นทีละ2
                var x = mouse.x-bullet_width/2;//ให้ var x (แกน x) เท่ากับ ความกว้างของเม้าท์และกระสุนปืนที่ยิงออกมาทางแกน x หาร 2
                var y = mouse.y-player_height;//ให้ var y (แกน y) เท่ากับ  ความสูงของเม้าท์ที่ผู้เล่นใช้เล่นในแกน y 
                var __bullet = new Bullet(x, y, bullet_width, bullet_height, bullet_speed);//ให้ var กระสุนปืน เท่ากับ กระสุนปืนใหม่ โดยกำหนดค่า x y ความกว้าง ความสูง ความเร็วของกระสุนปืนกระสุนใหม่
                _bullets.push(__bullet);//จำนวนกระสุนปืนเพิ่มขึ้น
              }
            }setInterval(fire, 200);//ให้โปรแกรมสร้างกระสุนปืนในทุกๆ 200 มิลลิวินาที
              
            canvas.addEventListener("click", function(){
            });//ให้องค์ประกอบที่กำหนดในฟังก์ชันการยิงปืนมาใช้กับฟังก์ชันจรวด
              
            
            function collision(a,b){ //การชนกัน โดยกำหนดให้ a,b ใช้คำสั่ง return เพื่อให้ฟังก์ชันจบการทำงาน และกลับไปยังฟังก์ชันที่ต้องการเรียกใช้
              return a.x < b.x + b.width && 
                     a.x + a.width > b.x &&
                     a.y < b.y + b.height &&
                     a.y + a.height > b.y;
            } 
            c.font = "1em Arial";//ขนาดฟ้อนกับชื่อฟ้อน
            
            function stoperror() {//หยุดข้อผิดพลาด
              return true; //ถ้า return แล้วจริง
            }  
            window.onerror = stoperror;//หน้าเกมที่มีปัญหา จะจัดการข้อผิดพลาดทันที
          
            function animate(){ 
              requestAnimationFrame(animate); //จะรีเฟรช fps ตาม web browsers
              c.beginPath(); //เริ่มต้นหรือรีเซทคะแนนและเลือด
              c.clearRect(0,0,innerWidth,innerHeight); //ล้างพิกเซลในกล่องสี่เหลี่ยมที่กำหนด โดย x ของมุมบนซ้ายที่จะล้างเป็น0 และ y ของมุมบนซ้ายที่จะล้างเป็น 0 ล้างความกว้างและความสูงพิกเซล
              c.fillStyle = 'black';//สีข้อความ
              c.fillText("Health: " + health,170,40); // เลือดตามด้วยค่าเลือด ตำแหน่งข้อความที่แกน x และ y
              c.fillText("Score: " + score, innerWidth-170,40);  //คะแนน ตามด้วยคะแนนที่ได้ ตำแหน่งข้อความที่แกน x และ y
              
              __player.update(); //อัพข้อมูลเลือด และคะแนนของผู้เล่นเรื่อยๆ
          
              for (var i=0; i < _bullets.length; i++){ //ใช้คำสั่ง for ในการวนลูปให้ทำงานซ้ำๆ กำหนดให้ var i เริ่มต้นเป็น 0 โดยที่ i น้อยกว่าความยาวของกระสุนปืน และ i เพิ่มทีละ 2 
                _bullets[i].update(); //เพิ่มจำนวนกระสุนปืน
                if (_bullets[i].y < 0){//ใช้คำสั่ง if  ถ้ากระสุนปืนเก็บค่า i ในแกน y น้อยกว่า 0
                  _bullets.splice(i, 1); //โดยกระสุนปืนมีค่าเริ่มต้นเป็น i และจำนวนที่ต้องการให้กระสุนหายไป คือ 1
                }
              }
          
              for (var k=0; k < _enemies.length; k++){ //ใช้คำสั่ง for ในการวนลูป กำหนดให้ var k เริ่มต้นเป็น 0 โดยที่ k น้อยกว่าความยาวของศัตรู และ k เพิ่มทีละ 2
                _enemies[k].update();//เพิ่มจำนวนศัตรู
                if(_enemies[k].y > innerHeight){ 
                  _enemies.splice(k, 1); //ถ้ายิงไม่โดนศัตรู 
                  health -= 10; //เลือดลดไปทีละ 10
                if(health == 0){ //ถ้าเลือดเหลือ 0
                  alert("You DIED!\nYour score was "+score); //ระบบจะแจ้งเตือนว่า You DIED! Your score was...... ตามด้วยคะแนนที่ยิงได้ 
                  startGame(); //เริ่มเกมใหม่
                 }
                }
              }
            
              for(var j = _enemies.length-1; j >= 0; j--){ // ใช้คำสั่งfor วนลูปให้ var j เริ่มต้นเป็น ความยาวของศัตรู-1 โดยที่ j มากกว่าหรือเท่ากับ 0 และ j ลดลงทีละ 2 
                for(var l = _bullets.length-1; l >= 0; l--){ // ใช้คำสั่งfor วนลูปให้ var l เริ่มต้นเป็น ความยาวของกระสุนปืน-1 โดยที่ j มากกว่าหรือเท่ากับ 0 และ l ลดลงทีละ 2
                  if(collision(_enemies[j], _bullets[l])){ //ถ้าชนศัตรูหรือยิงกระสุนได้ทัน
                    _enemies.splice(j, 1); //ศัตรูหายไป 1 ตัว
                    _bullets.splice(l, 1);  //กระสุนปืนหายไป 1 นัด
                    score++;//ได้คะแนนเพิ่มขึ้น
                  }
                }
              }
              
              for(var h=0; h < _healthkits.length; h++){ //ใช้คำสั่ง for ในการวนลูป ให้กล่องยาเพิ่มเรื่อยๆ กำหนดให้ var h เริ่มต้นเป็น 0 โดยที่ h น้อยกว่าความยาวของกล่องยา และมีค่าเพิ่มขึ้นทีละ 2 
                _healthkits[h].update(); //เพิ่มกล่องยาเรื่อยๆ
              }
              for(var hh = _healthkits.length-1; hh >= 0; hh--){ //ใช้คำสั่ง for ในการวนลูป ให้กล่องยาเพิ่มเรื่อยๆ กำหนดให้  hh เท่ากับ ความยาวของกล่องยา-1 โดยที่มีค่ามากกว่าหรือเท่ากับ 0 และมีค่าลดลงทีละ 2 
                for(var hhh = _bullets.length-1; hhh >= 0; hhh--){//ใช้คำสั่ง for ในการวนลูป ให้ hhh เท่ากับ ความยาวของกระสุน-1 โดยที่มีค่ามากกว่าหรือเท่ากับ 0 และมีค่าลดลงทีละ 2
                  if(collision(_healthkits[hh], _bullets[hhh])){ //ถ้ายิงหรือชนกล่องยา
                    _healthkits.splice(hh, 1);//กล่องยาหายไป 1 กล่อง
                    _bullets.splice(hhh, 1); //กระสุนหายไป 1 นัด
                    health += 10;//เลือดจะเพิ่มขึ้น 10
                  }
                }
              }  
            }
            
            animate(); //วนลูปให้ทำงาน
            }startGame(); //เริ่มเกมใหม่
            }; 