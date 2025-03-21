import React, { useEffect, useRef } from "react";

class Particle {
  parent;
  id;
  position = { x: 0, y: 0 };
  diameter = 0;
  life = 0;
  speed = { x: 0, y: 0 };

  constructor(id, parent) {
    this.parent = parent;
    this.id = id;
    this.init();
  }

  init() {
    const interval = setInterval(() => {
      this.position.x += (this.speed.x * 60) / 1000;
      this.position.y -= (this.speed.y * 60) / 1000;
      this.life -= 1 / 60;
      if (this.life <= 0) {
        clearInterval(interval);
        this.parent.particles.delete(this.id);
      }
    }, 1000 / 60);
  }
}

class ParticleSystem {
  canvas;
  size;
  lastId = 0;
  ammount = 0;
  particles = new Map();
  diameter = { min: 0, max: 0 };
  life = { min: 0, max: 0 };
  speed = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };

  static getRandomNumberInInterval(interval) {
    const min = Math.ceil(interval.min);
    const max = Math.floor(interval.max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createParticle() {
    const particle = new Particle(this.lastId.toString(), this);
    particle.position.x = ParticleSystem.getRandomNumberInInterval({
      min: 0,
      max: this.size.x,
    });
    particle.position.y = ParticleSystem.getRandomNumberInInterval({
      min: 0,
      max: this.size.y,
    });
    particle.diameter = ParticleSystem.getRandomNumberInInterval(this.diameter);
    particle.life = ParticleSystem.getRandomNumberInInterval(this.life);
    particle.speed.x = ParticleSystem.getRandomNumberInInterval(this.speed.x);
    particle.speed.y = ParticleSystem.getRandomNumberInInterval(this.speed.y);
    this.particles.set(this.lastId.toString(), particle);
    this.lastId++;
  }

  init() {
    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "white";
    this.particles = new Map();
    for (let i = 0; i < this.ammount; i++) {
      this.createParticle();
    }
    setInterval(() => {
      if (this.particles.size <= this.ammount) {
        this.createParticle();
      }
    }, 1000 / 60);
    setInterval(() => {
      ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles.forEach((particle) => {
        ctx?.beginPath();
        ctx?.arc(
          particle.position.x,
          particle.position.y,
          particle.diameter / 2,
          0,
          2 * Math.PI,
          false
        );
        ctx?.closePath();
        ctx?.fill();
      });
    }, 1000 / 60);
  }

  constructor(canvas, size) {
    this.canvas = canvas;
    this.size = size;
    canvas.width = size.x;
    canvas.height = size.y;
  }
}

const ParticleSystemComponent = () => {
  const canvasRef = useRef(null);
  const systemRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const system = new ParticleSystem(canvas, {
      x: window.innerWidth,
      y: window.innerHeight,
    });
    system.ammount = 100;
    system.diameter = { min: 1, max: 2 };
    system.life = { min: 15, max: 20 };
    system.speed = { x: { min: -10, max: 10 }, y: { min: -10, max: 10 } };
    system.init();
    systemRef.current = system;

    const handleResize = () => {
      system.size = { x: window.innerWidth, y: window.innerHeight };
      system.init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="container"
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
};

export default ParticleSystemComponent;
