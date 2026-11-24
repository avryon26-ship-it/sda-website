const hex = h => [1,3,5].map(i => parseInt(h.slice(i,i+2),16)/255);
const lin = c => c <= .03928 ? c/12.92 : ((c+.055)/1.055)**2.4;
const L = h => { const [r,g,b] = hex(h).map(lin); return .2126*r + .7152*g + .0722*b; };
const cr = (a,b) => { const [x,y] = [L(a),L(b)].sort((p,q)=>q-p); return ((x+.05)/(y+.05)); };
const P = { newsprint:'#E9E6CF', newsprint2:'#DDE0C4', celadon:'#D3DDC0', sage:'#B4C3A0', pistachio:'#F2F3E1', leaf:'#D4CF9C', ink:'#2A3E30', moss:'#56704F', stamp:'#94402C', turmeric:'#C28A2C' };
const pairs = [['ink','newsprint'],['ink','newsprint2'],['ink','celadon'],['ink','leaf'],['ink','pistachio'],['moss','newsprint'],['moss','celadon'],['stamp','newsprint'],['stamp','pistachio'],['newsprint','ink'],['celadon','ink'],['sage','ink'],['turmeric','ink'],['ink','turmeric'],['sage','newsprint']];
for (const [f,b] of pairs) { const r = cr(P[f],P[b]); console.log(`${f.padEnd(10)} on ${b.padEnd(10)} ${r.toFixed(2)}  ${r>=7?'AAA':r>=4.5?'AA':r>=3?'large only':'FAIL'}`); }
