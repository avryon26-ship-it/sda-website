const hex = h => [1,3,5].map(i => parseInt(h.slice(i,i+2),16)/255);
const lin = c => c <= .03928 ? c/12.92 : ((c+.055)/1.055)**2.4;
const L = h => { const [r,g,b] = hex(h).map(lin); return .2126*r + .7152*g + .0722*b; };
const cr = (a,b) => { const [x,y] = [L(a),L(b)].sort((p,q)=>q-p); return ((x+.05)/(y+.05)); };
const P = { paper:'#F4ECDD', paper2:'#E9DEC8', ink:'#1D3428', moss:'#3D5A40', sage:'#A9B89A', turmeric:'#D4962E', clay:'#A5563A' };
const pairs = [['ink','paper'],['ink','paper2'],['moss','paper'],['moss','paper2'],['clay','paper'],['clay','paper2'],['turmeric','paper'],['sage','paper'],['paper','ink'],['paper2','ink'],['sage','ink'],['turmeric','ink'],['ink','turmeric'],['paper','moss'],['clay','ink']];
for (const [f,b] of pairs) { const r = cr(P[f],P[b]); console.log(`${f.padEnd(9)} on ${b.padEnd(9)} ${r.toFixed(2)}  ${r>=7?'AAA':r>=4.5?'AA':r>=3?'large-text/graphics only':'FAIL'}`); }
