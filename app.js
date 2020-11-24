import * as PIXI from 'pixi.js'
import fit from 'math-fit'
import gsap from 'gsap'

import loadImages from './loadImages';
import t1 from './1.jpg'
import t2 from './2.jpg'
import t3 from './3.jpg'
import t4 from './4.jpg'

class Sketch {
  constructor() {
    this.app = new PIXI.Application({ 
      backgroundColor: 0x1099bb,
      resizeTo: window
    });
    document.body.appendChild(this.app.view);
    this.margin = 50;
    this.width = (window.innerWidth - 2 * this.margin) / 3;
    this.height = window.innerHeight * 0.8;
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.images = [t1, t2, t3, t4];

    loadImages(this.images, (images) => {
      this.loadImages = images;
      this.add();
      this.render();
    })
  }

  add() {
    let parent = {
      w: this.width,
      h: this.height,
    }

    this.loadImages.forEach((img, i) => {
      const texture = PIXI.Texture.from(img.img);
      const sprite = new PIXI.Sprite(texture);
      const container = new PIXI.Container();
      const spriteContainer = new PIXI.Container();

      let mask = new PIXI.Sprite(PIXI.Texture.WHITE);
      mask.width = this.width;
      mask.height = this.height;

      sprite.mask = mask;

      sprite.anchor.set(0.5);
      sprite.position.set(
        sprite.texture.orig.width/2,
        sprite.texture.orig.height/2,
      )

      let image = {
        w: sprite.texture.orig.width,
        h: sprite.texture.orig.height,
      }

      let cover = fit(image, parent);

      spriteContainer.position.set(cover.left, cover.top);
      spriteContainer.scale.set(cover.scale, cover.scale);

      container.x = (this.margin + this.width) * i;
      container.y = this.height / 10;
      
      spriteContainer.addChild(sprite);
      container.interactive = true;
      container.on('mouseover', this.mouseOn);
      container.on('mouseout', this.mouseOut);
      container.addChild(spriteContainer);
      container.addChild(mask);
      this.container.addChild(container);
    })
  }

  mouseOn(e) {
    let el = e.target.children[0].children[0];

    gsap.to(el.scale, {
      duration: 0.5,
      x: 1.2,
      y: 1.2,
    })
  }

  mouseOut(e) {
    let el = e.currentTarget.children[0].children[0];
    
    gsap.to(el.scale, {
      duration: 0.5,
      x: 1,
      y: 1,
    })
  }

  render() {
    this.app.ticker.add(() => {
      this.app.renderer.render(this.container);
    });
  }
}

new Sketch();
