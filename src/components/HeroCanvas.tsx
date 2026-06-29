import { useEffect, useRef } from "react";

interface Cursor {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  angle: number;
}

interface Character {
  x: number;
  y: number;
  blinkTimer: number;
  isBlinking: boolean;
  lookDirection: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frameCount = 0;
    let scaleFactor = 1.0;
    let alpha = 255;
    let targetPickCounter = 0;

    const cursor: Cursor = {
      x: 0, y: 0, targetX: 0, targetY: 0,
      vx: 0, vy: 0, angle: 0,
    };

    const char: Character = {
      x: 0, y: 0, blinkTimer: 0, isBlinking: false, lookDirection: 0,
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
      cursor.x = width / 2;
      cursor.y = height / 2;
      cursor.targetX = width / 2;
      cursor.targetY = height / 2;
      char.x = width / 2 + 100;
      char.y = height / 2;
    };

    resize();
    window.addEventListener("resize", resize);

    const rows = 40;
    const cols = 40;
    const specialGreenRows = new Set([3, 7, 15, 23, 31, 39]);

    function drawRoundedRect(
      c: CanvasRenderingContext2D,
      x: number, y: number, w: number, h: number, r: number
    ) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r);
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h);
      c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
      c.fill();
    }

    function drawFrame() {
      if (!ctx) return;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      const offW = width * scaleFactor;
      const offH = height * scaleFactor;

      const offscreen = document.createElement("canvas");
      offscreen.width = offW;
      offscreen.height = offH;
      const oCtx = offscreen.getContext("2d");
      if (!oCtx) return;

      oCtx.fillStyle = "#0a0a0a";
      oCtx.fillRect(0, 0, offW, offH);

      const cellSize = offW / cols;
      const pixelSize = cellSize * 0.6;

      targetPickCounter++;
      if (targetPickCounter > 60) {
        cursor.targetX = 100 + Math.random() * (offW - 200);
        cursor.targetY = 100 + Math.random() * (offH - 200);
        targetPickCounter = 0;
      }

      cursor.vx += (cursor.targetX - cursor.x) * 0.02;
      cursor.vy += (cursor.targetY - cursor.y) * 0.02;
      cursor.vx *= 0.9;
      cursor.vy *= 0.9;
      cursor.x += cursor.vx;
      cursor.y += cursor.vy;
      cursor.angle += 0.01;

      char.blinkTimer++;
      if (char.blinkTimer > 100 && Math.random() < 0.02) {
        char.isBlinking = true;
        char.blinkTimer = 0;
      }
      if (char.isBlinking && char.blinkTimer > 10) {
        char.isBlinking = false;
      }
      char.lookDirection = Math.sin(frameCount * 0.02) * 5;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellSize;
          const y = row * cellSize;
          const dx = x - cursor.x;
          const dy = y - cursor.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const distAlpha = Math.max(0, Math.min(255, 255 - dist * 0.15));

          const blink = 0.5 + 0.5 * Math.sin((frameCount + row * 10 + col * 10) * 0.05);
          const finalAlpha = distAlpha * (0.3 + 0.7 * blink) * (alpha / 255);

          if (finalAlpha <= 0) continue;

          const isGreenRow = specialGreenRows.has(row);
          const color = isGreenRow ? "rgb(163, 255, 0)" : "rgb(208, 208, 208)";

          const sizeFactor = 0.5 + 0.5 * Math.sin((frameCount + row * 15 + col * 15) * 0.1);
          const s = pixelSize * (0.8 + 0.2 * sizeFactor);

          oCtx.globalAlpha = finalAlpha / 255;
          oCtx.fillStyle = color;
          drawRoundedRect(oCtx, x + (cellSize - s) / 2, y + (cellSize - s) / 2, s, s, s * 0.2);
          oCtx.globalAlpha = 1.0;
        }
      }

      oCtx.strokeStyle = "rgba(163, 255, 0, 0.8)";
      oCtx.lineWidth = 2;
      oCtx.beginPath();
      oCtx.moveTo(cursor.x - 15, cursor.y - 15);
      oCtx.lineTo(cursor.x + 15, cursor.y - 15);
      oCtx.lineTo(cursor.x + 15, cursor.y + 15);
      oCtx.stroke();

      oCtx.fillStyle = "#a3ff00";
      oCtx.fillRect(char.x - 20, char.y - 25, 40, 30);
      oCtx.fillStyle = "#0a0a0a";
      oCtx.fillRect(char.x - 15, char.y - 20, 30, 20);
      oCtx.fillStyle = "#a3ff00";
      oCtx.fillRect(char.x - 8, char.y - 12, 16, 8);
      if (!char.isBlinking) {
        oCtx.fillStyle = "#0a0a0a";
        oCtx.fillRect(char.x - 5 + char.lookDirection, char.y - 8, 3, 3);
        oCtx.fillRect(char.x + 2 + char.lookDirection, char.y - 8, 3, 3);
      } else {
        oCtx.fillStyle = "#0a0a0a";
        oCtx.fillRect(char.x - 5 + char.lookDirection, char.y - 7, 3, 1);
        oCtx.fillRect(char.x + 2 + char.lookDirection, char.y - 7, 3, 1);
      }
      oCtx.fillStyle = "#a3ff00";
      oCtx.fillRect(char.x - 15, char.y + 5, 30, 8);
      oCtx.fillStyle = "#0a0a0a";
      for (let k = 0; k < 5; k++) {
        oCtx.fillRect(char.x - 12 + k * 6, char.y + 7, 4, 3);
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, cx - offW / 2, cy - offH / 2, offW, offH);

      ctx.strokeStyle = "rgba(163, 255, 0, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 0);
      ctx.lineTo(40, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width - 40, 0);
      ctx.lineTo(width - 40, height);
      ctx.stroke();

      const hudW = 260;
      const hudH = 90;
      const hudX = width - hudW - 24;
      const hudY = height - hudH - 24;

      ctx.fillStyle = "rgba(10, 10, 10, 0.85)";
      ctx.strokeStyle = "rgba(163, 255, 0, 0.5)";
      ctx.lineWidth = 1;
      ctx.fillRect(hudX, hudY, hudW, hudH);
      ctx.strokeRect(hudX, hudY, hudW, hudH);

      const hudData = [
        { label: "TERM COUNT", value: "1,240" },
        { label: "CATEGORIES", value: "18" },
        { label: "DAILY VIEWS", value: "42K" },
      ];

      hudData.forEach((item, i) => {
        const rowY = hudY + 18 + i * 24;
        ctx.fillStyle = "#8c8c8c";
        ctx.font = "10px Inter, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(item.label, hudX + 12, rowY);
        ctx.fillStyle = "#a3ff00";
        ctx.font = "16px 'Courier New', monospace";
        ctx.textAlign = "right";
        ctx.fillText(item.value, hudX + hudW - 12, rowY);
      });
      ctx.textAlign = "start";

      scaleFactor += 0.002;
      if (scaleFactor > 1.8) {
        alpha -= 2;
      }
      if (alpha < 0) {
        alpha = 0;
      }
      frameCount++;

      frameRef.current = requestAnimationFrame(drawFrame);
    }

    frameRef.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full" style={{ height: "calc(100vh - 64px)" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h1 className="font-pixel text-[clamp(24px,5vw,56px)] text-[#f0f0f0] text-center leading-tight neon-glow px-4">
          GAMER GLOSSARY
        </h1>
      </div>
    </section>
  );
}
