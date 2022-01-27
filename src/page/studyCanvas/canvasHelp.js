export class CanvasHelp {
    constructor(canvasDom) {
        this.canvasDom = canvasDom;
        this.ctx = canvasDom.getContext('2d');
    }
    moveTo(...args) {
        this.ctx.beginPath(); // 开始路径绘制
        this.ctx.moveTo(...args); // 设置路径起点，坐标为(20,20)
    }
    lineTo(...args) {
        this.ctx.lineTo(...args); // 绘制一条到(200,20)的直线
    }
    drawline(v1, v2, color) {
        const ctx = this.ctx
        ctx.beginPath()
        // 设置颜色
        ctx.strokeStyle = color.toRgba()
        // 移动起点
        ctx.moveTo(v1.x, v1.y)
        // 连接到终点
        ctx.lineTo(v2.x, v2.y)
        ctx.closePath()
        // 绘制path的stroke(边框)
        ctx.stroke()
    }
    drawMesh(mesh) {
        console.log(mesh, 777);
        const { indices, vertices } = mesh
        // 偏移的魔数
        const position = Vector.new(150, 100, 0)
        const color = Color.blue()
        indices.forEach(ind => {
            const [v1, v2, v3] = ind.map(i => {
                // 强行缩放的魔数
                return vertices[i].position.multi_num(30).add(position)
            })
            this.drawline(v1, v2, color)
            this.drawline(v2, v3, color)
            this.drawline(v1, v3, color)
        })
    }
}

export class GObject {
    static new(...val) {
        return new this(...val);
    }
}

export class Vector extends GObject {
    // 表示三维点的类
    constructor(x, y, z) {
        super()
        this.x = x
        this.y = y
        this.z = z
    }

    multi_num(n) {
        return Vector.new(this.x * n, this.y * n, this.z * n)
    }

    add(v) {
        let x = this.x + v.x
        let y = this.y + v.y
        let z = this.z + v.z
        return Vector.new(x, y, z)
    }
}

export class Color extends GObject {
    // 表示颜色的类
    constructor(r, g, b, a) {
        super()
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }
    static newHex(hex) {
        hex = hex.replace('#', '')
        let r = parseInt(hex.substring(0, 2), 16)
        let g = parseInt(hex.substring(2, 4), 16)
        let b = parseInt(hex.substring(4, 6), 16)
        let a = 255
        return this.new(r, g, b, a)
    }
    toRgba() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
    interpolate(other, factor) {
        let c1 = this
        let c2 = other
        let r = c1.r + (c2.r - c1.r) * factor
        let g = c1.g + (c2.g - c1.g) * factor
        let b = c1.b + (c2.b - c1.b) * factor
        let a = c1.a + (c2.a - c1.a) * factor
        return GuaColor.new(r, g, b, a)
    }
    equal(c) {
        if (this.r === c.r && this.g === c.g && this.b === c.b && this.a === c.a) {
            return true
        }
        return false
    }
    // 随机颜色
    static randomColor() {
        // random01 是 utils.js 中的函数
        return this.new(random01() * 255, random01() * 255, random01() * 255, 1 * 255)
    }
    // 常见的几个颜色
    static black() {
        return this.new(0, 0, 0, 255)
    }
    static white() {
        return this.new(255, 255, 255, 255)
    }
    static transparent() {
        return this.new(0, 0, 0, 0)
    }
    static red() {
        return this.new(255, 0, 0, 255)
    }
    static green() {
        return this.new(0, 255, 0, 255)
    }
    static blue() {
        return this.new(0, 0, 255, 255)
    }
}

export class Vertex extends GObject {
    // 表示顶点的类, 包含 Vector 和 Color
    // 表示了一个坐标和一个颜色
    constructor(position, color) {
        super()
        this.position = position
        this.color = color
    }
    interpolate(other, factor) {
        let a = this
        let b = other
        let p = a.position.interpolate(b.position, factor)
        let c = a.color ? a.color.interpolate(b.color, factor) : null
        return Vertex.new(p, c)
    }
}


export class Mesh extends GObject {
    // 表示三维物体的类
    constructor() {
        super()

        this.position = Vector.new(0, 0, 0)
        this.rotation = Vector.new(0, 0, 0)
        this.scale = Vector.new(1, 1, 1)
        this.vertices = null
        this.indices = null
    }
    // 返回一个正方体
    //
    //    v0----- v1
    //   /|      /|
    //  v4------v5|
    //  | |     | |
    //  | |v2---|-|v3
    //  |/      |/
    //  v6------v7
    //
    // Coordinates
    // 右手坐标系
    //       Y
    //       |
    //       |
    //       O ------ X
    //      /
    //    Z
    //
    cube() {
        // 8 points
        let points = [
            -1, 1, -1,     // 0
            1, 1, -1,     // 1
            -1, -1, -1,     // 2
            1, -1, -1,     // 3
            -1, 1, 1,      // 4
            1, 1, 1,      // 5
            -1, -1, 1,      // 6
            1, -1, 1,      // 7
        ]

        let vertices = []
        for (let i = 0; i < points.length; i += 3) {
            let v = Vector.new(points[i], points[i + 1], points[i + 2])
            let c = Color.randomColor()
            vertices.push(Vertex.new(v, c))
        }

        // 12 triangles * 3 vertices each = 36 vertex indices
        let indices = [
            // 12
            [0, 1, 2],
            [1, 3, 2],
            [1, 7, 3],
            [1, 5, 7],
            [5, 6, 7],
            [5, 4, 6],
            [4, 0, 6],
            [0, 2, 6],
            [0, 4, 5],
            [5, 1, 0],
            [2, 3, 7],
            [2, 7, 6],
        ]
        console.log(this, 777);
        let m = Mesh.new()
        m.vertices = vertices
        m.indices = indices
        console.log(m, 777);
        return m
    }
}


const random01 = () => Math.random()