import './styles/global.css';
import p5 from 'p5';
import sketch from './sketch.js';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

new p5(sketch, app);