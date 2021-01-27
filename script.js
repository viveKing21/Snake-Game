 let eat=new Audio('eat.wav')
    
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.height = 300
    canvas.width = 300
    ctx.fillStyle = 'red'
    let h = 10, w = 10
    let direction = 39
    let path = [[0, 0]]
    let oldPath = path
    let eaten = false
    let play = true
    let score=0
    //bugs property
    let posX = 0, posY = 0

    window.onkeyup = (e) => {

        if (e.keyCode == 32 && play) {
            this.interval = setInterval(moveSnake, 50)
            play = false
        }
        else if (e.keyCode >= 37 && e.keyCode <= 40 && !play)
            direction = path.length==1?e.keyCode:e.keyCode==39&&direction==37?37:e.keyCode==37&&direction==39?39:e.keyCode==38&&direction==40?40:e.keyCode==40&&direction==38?38:e.keyCode

    }
    bugs()
    path.map((p) => ctx.fillRect(p[0], p[1], w, h))
    let r=0
    function moveSnake() {
        r=r==0 ? 1:0
        eaten = false
        switch (direction) {
            case 39: {
                path = path.map((p, i) => path.length - 1 == i ? [p[0] + w >= canvas.width ? 0 : p[0] + w, p[1]] : path[i + 1])
                //right
                break
            }
            case 40: {
                path = path.map((p, i) => path.length - 1 == i ? [p[0], p[1] + h >= canvas.height ? 0 : p[1] + h] : path[i + 1])
                //down
                break
            }
            case 38: {
                path = path.map((p, i) => path.length - 1 == i ? [p[0], p[1] <= 0 ? canvas.height - h : p[1] - h] : path[i + 1])
                //up
                break
            }
            case 37: {
                path = path.map((p, i) => path.length - 1 == i ? [p[0] <= 0 ? canvas.width - w : p[0] - w, p[1]] : path[i + 1])
                //left
                break
            }
        }
        if (path[path.length - 1][0] < posX + w && path[path.length - 1][0] + w > posX &&
            path[path.length - 1][1] + h > posY && path[path.length - 1][1] < posY + h) {
                eat.play()
                score++
                console.log(score)
            //cleaning bug
            ctx.clearRect(posX, posY, w, h)
            eaten = true
            path = path.reverse()
            path.push(oldPath[0])
            path = path.reverse()
            //creating bug
            bugs()
        }
        if (path.slice(0, path.length - 1).some(ar => String(ar) == String(path[path.length - 1])))
            gameOver()
        else {
           
                if (!eaten)
                ctx.clearRect(oldPath[0][0], oldPath[0][1], w, h)
                oldPath = path
                ctx.strokeRect(path[path.length - 1][0]+1, path[path.length - 1][1]+1,w-2,h-2)
            
        }
    }
    function bugs() {
        bugCreated = true
        posX = Math.floor(Math.random() * 280);
        posY = Math.floor(Math.random() * 280);
        let isOverriding = path.some((pos) => {
            return pos[0] + w > posX && pos[0] < posX + w && pos[1] + w > posY && pos[1] < posY + w
        })
        if (isOverriding) {
            bugs()
        }
        else {
            ctx.fillStyle = 'green'
            ctx.fillRect(posX, posY, w, h)
        }
        ctx.fillStyle = 'red'
    }
    function gameOver() {
        alert('game over')
        clearInterval(this.interval)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        play = true
        direction = 39
        path = [[0, 0]]
        oldPath = path
        eaten = false
        bugs()
        path.map((p) => ctx.fillRect(p[0], p[1], w, h))
    }