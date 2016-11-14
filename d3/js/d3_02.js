var svgctrl = d3.selectAll("svg");
var c = svgctrl.append('circle');
var c1 = svgctrl.append('circle');
var c2 = svgctrl.append('circle');
var c3 = svgctrl.append('circle');
var c4 = svgctrl.append('circle');
var p = svgctrl.append('polygon');
var cx = 200;
var cy = 210;

c.attr('cx', cx).attr('cy', cy).attr('r', 120).attr('stroke', 'gold').attr('stroke-width', 6).attr('fill', '#000000');
p.attr('points', '200,110 140,298 290,178 110,178 260,298').attr('fill', 'gold').attr('opacity', '0.5');
c1.attr('cx', cx - 136).attr('cy', cy).attr('r', 10).attr('stroke', 'gold').attr('stroke-width', 6).attr('fill', '#000000');
c2.attr('cx', cx + 136).attr('cy', cy).attr('r', 10).attr('stroke', 'gold').attr('stroke-width', 6).attr('fill', '#000000');
c3.attr('cx', cx).attr('cy', cy - 136).attr('r', 10).attr('stroke', 'gold').attr('stroke-width', 6).attr('fill', '#000000');
c4.attr('cx', cx).attr('cy', cy + 136).attr('r', 10).attr('stroke', 'gold').attr('stroke-width', 6).attr('fill', '#000000');

function Left() {
    c1.attr('cx', cx - 156).attr('cy', cy);

}
function Right() {
    c2.attr('cx', cx + 156).attr('cy', cy);

}
function Up() {
    c3.attr('cx', cx).attr('cy', cy - 156);

}
function Down() {
    c4.attr('cx', cx).attr('cy', cy + 156);
}

function x1() {
    c1.attr('cx', cx - 136);
    c2.attr('cx', cx + 136);
    c3.attr('cy', cy - 136);
    c4.attr('cy', cy + 136);
}

function x2() {
    var i = (Math.floor(Math.random() * 256)).toString(16);
    var j = (Math.floor(Math.random() * 256)).toString(16);
    var k = (Math.floor(Math.random() * 256)).toString(16);
    $('polygon').attr('fill', '#' + i + j + k);
}