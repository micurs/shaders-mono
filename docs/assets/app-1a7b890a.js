(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();var re=Object.defineProperty,oe=(e,t,r)=>t in e?re(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,D=(e,t,r)=>(oe(e,typeof t!="symbol"?t+"":t,r),r),mt=1e-6,N=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});function Rt(){var e=new N(9);return N!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function ie(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e}function J(){var e=new N(16);return N!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function K(e){var t=new N(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function ne(e,t,r,o,i,n,s,a,c,u,l,d,h,p,f,m){var g=new N(16);return g[0]=e,g[1]=t,g[2]=r,g[3]=o,g[4]=i,g[5]=n,g[6]=s,g[7]=a,g[8]=c,g[9]=u,g[10]=l,g[11]=d,g[12]=h,g[13]=p,g[14]=f,g[15]=m,g}function Pt(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function se(e,t){if(e===t){var r=t[1],o=t[2],i=t[3],n=t[6],s=t[7],a=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=r,e[6]=t[9],e[7]=t[13],e[8]=o,e[9]=n,e[11]=t[14],e[12]=i,e[13]=s,e[14]=a}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e}function z(e,t){var r=t[0],o=t[1],i=t[2],n=t[3],s=t[4],a=t[5],c=t[6],u=t[7],l=t[8],d=t[9],h=t[10],p=t[11],f=t[12],m=t[13],g=t[14],V=t[15],_=r*a-o*s,y=r*c-i*s,b=r*u-n*s,x=o*c-i*a,M=o*u-n*a,C=i*u-n*c,A=l*m-d*f,F=l*g-h*f,U=l*V-p*f,R=d*g-h*m,k=d*V-p*m,Z=h*V-p*g,L=_*Z-y*k+b*R+x*U-M*F+C*A;return L?(L=1/L,e[0]=(a*Z-c*k+u*R)*L,e[1]=(i*k-o*Z-n*R)*L,e[2]=(m*C-g*M+V*x)*L,e[3]=(h*M-d*C-p*x)*L,e[4]=(c*U-s*Z-u*F)*L,e[5]=(r*Z-i*U+n*F)*L,e[6]=(g*b-f*C-V*y)*L,e[7]=(l*C-h*b+p*y)*L,e[8]=(s*k-a*U+u*A)*L,e[9]=(o*U-r*k-n*A)*L,e[10]=(f*M-m*b+V*_)*L,e[11]=(d*b-l*M-p*_)*L,e[12]=(a*F-s*R-c*A)*L,e[13]=(r*R-o*F+i*A)*L,e[14]=(m*y-f*x-g*_)*L,e[15]=(l*x-d*y+h*_)*L,e):null}function gt(e,t,r){var o=t[0],i=t[1],n=t[2],s=t[3],a=t[4],c=t[5],u=t[6],l=t[7],d=t[8],h=t[9],p=t[10],f=t[11],m=t[12],g=t[13],V=t[14],_=t[15],y=r[0],b=r[1],x=r[2],M=r[3];return e[0]=y*o+b*a+x*d+M*m,e[1]=y*i+b*c+x*h+M*g,e[2]=y*n+b*u+x*p+M*V,e[3]=y*s+b*l+x*f+M*_,y=r[4],b=r[5],x=r[6],M=r[7],e[4]=y*o+b*a+x*d+M*m,e[5]=y*i+b*c+x*h+M*g,e[6]=y*n+b*u+x*p+M*V,e[7]=y*s+b*l+x*f+M*_,y=r[8],b=r[9],x=r[10],M=r[11],e[8]=y*o+b*a+x*d+M*m,e[9]=y*i+b*c+x*h+M*g,e[10]=y*n+b*u+x*p+M*V,e[11]=y*s+b*l+x*f+M*_,y=r[12],b=r[13],x=r[14],M=r[15],e[12]=y*o+b*a+x*d+M*m,e[13]=y*i+b*c+x*h+M*g,e[14]=y*n+b*u+x*p+M*V,e[15]=y*s+b*l+x*f+M*_,e}function ct(e,t,r){var o=r[0],i=r[1],n=r[2],s,a,c,u,l,d,h,p,f,m,g,V;return t===e?(e[12]=t[0]*o+t[4]*i+t[8]*n+t[12],e[13]=t[1]*o+t[5]*i+t[9]*n+t[13],e[14]=t[2]*o+t[6]*i+t[10]*n+t[14],e[15]=t[3]*o+t[7]*i+t[11]*n+t[15]):(s=t[0],a=t[1],c=t[2],u=t[3],l=t[4],d=t[5],h=t[6],p=t[7],f=t[8],m=t[9],g=t[10],V=t[11],e[0]=s,e[1]=a,e[2]=c,e[3]=u,e[4]=l,e[5]=d,e[6]=h,e[7]=p,e[8]=f,e[9]=m,e[10]=g,e[11]=V,e[12]=s*o+l*i+f*n+t[12],e[13]=a*o+d*i+m*n+t[13],e[14]=c*o+h*i+g*n+t[14],e[15]=u*o+p*i+V*n+t[15]),e}function ae(e,t,r){var o=r[0],i=r[1],n=r[2];return e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e[3]=t[3]*o,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*n,e[9]=t[9]*n,e[10]=t[10]*n,e[11]=t[11]*n,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function kt(e,t,r){var o=Math.sin(r),i=Math.cos(r),n=t[4],s=t[5],a=t[6],c=t[7],u=t[8],l=t[9],d=t[10],h=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=n*i+u*o,e[5]=s*i+l*o,e[6]=a*i+d*o,e[7]=c*i+h*o,e[8]=u*i-n*o,e[9]=l*i-s*o,e[10]=d*i-a*o,e[11]=h*i-c*o,e}function Zt(e,t,r){var o=Math.sin(r),i=Math.cos(r),n=t[0],s=t[1],a=t[2],c=t[3],u=t[8],l=t[9],d=t[10],h=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=n*i-u*o,e[1]=s*i-l*o,e[2]=a*i-d*o,e[3]=c*i-h*o,e[8]=n*o+u*i,e[9]=s*o+l*i,e[10]=a*o+d*i,e[11]=c*o+h*i,e}function Ot(e,t,r){var o=Math.sin(r),i=Math.cos(r),n=t[0],s=t[1],a=t[2],c=t[3],u=t[4],l=t[5],d=t[6],h=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=n*i+u*o,e[1]=s*i+l*o,e[2]=a*i+d*o,e[3]=c*i+h*o,e[4]=u*i-n*o,e[5]=l*i-s*o,e[6]=d*i-a*o,e[7]=h*i-c*o,e}function ce(e,t,r){var o=t[0],i=t[1],n=t[2],s=t[3],a=o+o,c=i+i,u=n+n,l=o*a,d=o*c,h=o*u,p=i*c,f=i*u,m=n*u,g=s*a,V=s*c,_=s*u;return e[0]=1-(p+m),e[1]=d+_,e[2]=h-V,e[3]=0,e[4]=d-_,e[5]=1-(l+m),e[6]=f+g,e[7]=0,e[8]=h+V,e[9]=f-g,e[10]=1-(l+p),e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e}function le(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function ue(e,t){var r=t[0],o=t[1],i=t[2],n=t[4],s=t[5],a=t[6],c=t[8],u=t[9],l=t[10];return e[0]=Math.hypot(r,o,i),e[1]=Math.hypot(n,s,a),e[2]=Math.hypot(c,u,l),e}function he(e,t,r,o){var i=t[0],n=t[1],s=t[2],a=t[3],c=i+i,u=n+n,l=s+s,d=i*c,h=i*u,p=i*l,f=n*u,m=n*l,g=s*l,V=a*c,_=a*u,y=a*l,b=o[0],x=o[1],M=o[2];return e[0]=(1-(f+g))*b,e[1]=(h+y)*b,e[2]=(p-_)*b,e[3]=0,e[4]=(h-y)*x,e[5]=(1-(d+g))*x,e[6]=(m+V)*x,e[7]=0,e[8]=(p+_)*M,e[9]=(m-V)*M,e[10]=(1-(d+f))*M,e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e}function de(e,t){var r=t[0],o=t[1],i=t[2],n=t[3],s=r+r,a=o+o,c=i+i,u=r*s,l=o*s,d=o*a,h=i*s,p=i*a,f=i*c,m=n*s,g=n*a,V=n*c;return e[0]=1-d-f,e[1]=l+V,e[2]=h-g,e[3]=0,e[4]=l-V,e[5]=1-u-f,e[6]=p+m,e[7]=0,e[8]=h+g,e[9]=p-m,e[10]=1-u-d,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function pe(e,t,r,o,i){var n=1/Math.tan(t/2),s;return e[0]=n/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0?(s=1/(o-i),e[10]=(i+o)*s,e[14]=2*i*o*s):(e[10]=-1,e[14]=-2*o),e}var fe=pe;function qt(e,t,r,o){var i,n,s,a,c,u,l,d,h,p,f=t[0],m=t[1],g=t[2],V=o[0],_=o[1],y=o[2],b=r[0],x=r[1],M=r[2];return Math.abs(f-b)<mt&&Math.abs(m-x)<mt&&Math.abs(g-M)<mt?Pt(e):(l=f-b,d=m-x,h=g-M,p=1/Math.hypot(l,d,h),l*=p,d*=p,h*=p,i=_*h-y*d,n=y*l-V*h,s=V*d-_*l,p=Math.hypot(i,n,s),p?(p=1/p,i*=p,n*=p,s*=p):(i=0,n=0,s=0),a=d*s-h*n,c=h*i-l*s,u=l*n-d*i,p=Math.hypot(a,c,u),p?(p=1/p,a*=p,c*=p,u*=p):(a=0,c=0,u=0),e[0]=i,e[1]=a,e[2]=l,e[3]=0,e[4]=n,e[5]=c,e[6]=d,e[7]=0,e[8]=s,e[9]=u,e[10]=h,e[11]=0,e[12]=-(i*f+n*m+s*g),e[13]=-(a*f+c*m+u*g),e[14]=-(l*f+d*m+h*g),e[15]=1,e)}function ot(){var e=new N(3);return N!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function me(e){var t=e[0],r=e[1],o=e[2];return Math.hypot(t,r,o)}function pt(e,t,r){var o=new N(3);return o[0]=e,o[1]=t,o[2]=r,o}function ve(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e}function ge(e,t){var r=t[0],o=t[1],i=t[2],n=r*r+o*o+i*i;return n>0&&(n=1/Math.sqrt(n)),e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function zt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function lt(e,t,r){var o=t[0],i=t[1],n=t[2],s=r[0],a=r[1],c=r[2];return e[0]=i*c-n*a,e[1]=n*s-o*c,e[2]=o*a-i*s,e}var _e=me;(function(){var e=ot();return function(t,r,o,i,n,s){var a,c;for(r||(r=3),o||(o=0),i?c=Math.min(i*r+o,t.length):c=t.length,a=o;a<c;a+=r)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],n(e,e,s),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2];return t}})();function $t(){var e=new N(4);return N!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function xe(e){var t=new N(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function I(e,t,r,o){var i=new N(4);return i[0]=e,i[1]=t,i[2]=r,i[3]=o,i}function Yt(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e}function jt(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e}function ye(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e[3]=t[3]*r[3],e}function we(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e}function be(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e}function rt(e,t){var r=t[0],o=t[1],i=t[2],n=t[3],s=r*r+o*o+i*i+n*n;return s>0&&(s=1/Math.sqrt(s)),e[0]=r*s,e[1]=o*s,e[2]=i*s,e[3]=n*s,e}function Y(e,t,r){var o=t[0],i=t[1],n=t[2],s=t[3];return e[0]=r[0]*o+r[4]*i+r[8]*n+r[12]*s,e[1]=r[1]*o+r[5]*i+r[9]*n+r[13]*s,e[2]=r[2]*o+r[6]*i+r[10]*n+r[14]*s,e[3]=r[3]*o+r[7]*i+r[11]*n+r[15]*s,e}(function(){var e=$t();return function(t,r,o,i,n,s){var a,c;for(r||(r=4),o||(o=0),i?c=Math.min(i*r+o,t.length):c=t.length,a=o;a<c;a+=r)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],e[3]=t[a+3],n(e,e,s),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2],t[a+3]=e[3];return t}})();function _t(){var e=new N(4);return N!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function Me(e,t,r){r=r*.5;var o=Math.sin(r);return e[0]=o*t[0],e[1]=o*t[1],e[2]=o*t[2],e[3]=Math.cos(r),e}function Ve(e,t,r){var o=t[0],i=t[1],n=t[2],s=t[3],a=r[0],c=r[1],u=r[2],l=r[3];return e[0]=o*l+s*a+i*u-n*c,e[1]=i*l+s*c+n*a-o*u,e[2]=n*l+s*u+o*c-i*a,e[3]=s*l-o*a-i*c-n*u,e}function Te(e,t,r){r*=.5;var o=t[0],i=t[1],n=t[2],s=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c+s*a,e[1]=i*c+n*a,e[2]=n*c-i*a,e[3]=s*c-o*a,e}function Pe(e,t,r){r*=.5;var o=t[0],i=t[1],n=t[2],s=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c-n*a,e[1]=i*c+s*a,e[2]=n*c+o*a,e[3]=s*c-i*a,e}function Se(e,t,r){r*=.5;var o=t[0],i=t[1],n=t[2],s=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c+i*a,e[1]=i*c-o*a,e[2]=n*c+s*a,e[3]=s*c-n*a,e}function yt(e,t,r,o){var i=t[0],n=t[1],s=t[2],a=t[3],c=r[0],u=r[1],l=r[2],d=r[3],h,p,f,m,g;return p=i*c+n*u+s*l+a*d,p<0&&(p=-p,c=-c,u=-u,l=-l,d=-d),1-p>mt?(h=Math.acos(p),f=Math.sin(h),m=Math.sin((1-o)*h)/f,g=Math.sin(o*h)/f):(m=1-o,g=o),e[0]=m*i+g*c,e[1]=m*n+g*u,e[2]=m*s+g*l,e[3]=m*a+g*d,e}function et(e,t){var r=t[0],o=t[1],i=t[2],n=t[3],s=r*r+o*o+i*i+n*n,a=s?1/s:0;return e[0]=-r*a,e[1]=-o*a,e[2]=-i*a,e[3]=n*a,e}function Ht(e,t){var r=t[0]+t[4]+t[8],o;if(r>0)o=Math.sqrt(r+1),e[3]=.5*o,o=.5/o,e[0]=(t[5]-t[7])*o,e[1]=(t[6]-t[2])*o,e[2]=(t[1]-t[3])*o;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var n=(i+1)%3,s=(i+2)%3;o=Math.sqrt(t[i*3+i]-t[n*3+n]-t[s*3+s]+1),e[i]=.5*o,o=.5/o,e[3]=(t[n*3+s]-t[s*3+n])*o,e[n]=(t[n*3+i]+t[i*3+n])*o,e[s]=(t[s*3+i]+t[i*3+s])*o}return e}var ft=xe,Ce=I,Xt=rt;(function(){var e=ot(),t=pt(1,0,0),r=pt(0,1,0);return function(o,i,n){var s=zt(i,n);return s<-.999999?(lt(e,t,i),_e(e)<1e-6&&lt(e,r,i),ge(e,e),Me(o,e,Math.PI),o):s>.999999?(o[0]=0,o[1]=0,o[2]=0,o[3]=1,o):(lt(e,i,n),o[0]=e[0],o[1]=e[1],o[2]=e[2],o[3]=1+s,Xt(o,o))}})();(function(){var e=_t(),t=_t();return function(r,o,i,n,s,a){return yt(e,o,s,a),yt(t,i,n,a),yt(r,e,t,2*a*(1-a)),r}})();(function(){var e=Rt();return function(t,r,o,i){return e[0]=o[0],e[3]=o[1],e[6]=o[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],Xt(t,Ht(t,e))}})();const vt=class ${constructor(){D(this,"_coord"),D(this,"scale",t=>{const r=new $;return we(r._coord,this._coord,t),r}),D(this,"dot",t=>zt(this.vec3(),t.vec3())),D(this,"crossProduct",t=>{const r=ot();return lt(r,this.vec3(),t.vec3()),$.fromVec3(r)}),D(this,"add",t=>{const r=new $;return Yt(r._coord,this._coord,t._coord),r}),D(this,"multiply",t=>{const r=new $;return ye(r._coord,this._coord,t._coord),r}),this._coord=I(0,0,0,0)}static get bufferSize(){return 4*4}static fromValues(t,r,o){const i=new $;return i._coord=I(t,r,o,0),i}static fromVec4(t){const r=new $,o=t[3]!==0?t[3]:1;return r._coord=I(t[0]/o,t[1]/o,t[2]/o,0),r}static fromVec3(t){const r=new $;return r._coord=I(t[0],t[1],t[2],0),r}static fromPoints(t,r){const o=new $;return jt(o._coord,t.vec4(),r.vec4()),o}static fromPoint(t){const r=new $;return r._coord=[...t.triplet,0],r}toString(){return`Vector(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new $;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),r}unMap(t){const r=new $;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}isUnitVector(){return!1}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get triplet(){return[this.x,this.y,this.z]}get coordinates(){return[...this._coord.values()]}buffer(){return new Float32Array(this.coordinates)}get length(){const t=this._coord[0],r=this._coord[1],o=this._coord[2];return Math.sqrt(t*t+r*r+o*o)}get lengthSquare(){const t=this._coord[0],r=this._coord[1],o=this._coord[2];return t*t+r*r+o*o}vec3(){return pt(this.x,this.y,this.z)}vec4(){return I(this.x,this.y,this.z,0)}};D(vt,"crossProduct",(e,t)=>{const r=ot();return lt(r,e.vec3(),t.vec3()),vt.fromVec3(r)}),D(vt,"dot",(e,t)=>zt(e.vec3(),t.vec3()));let S=vt;class v{constructor(){D(this,"_coord"),this._coord=I(0,0,0,1)}static get bufferSize(){return 4*4}static origin(){return new v}static fromValues(t,r,o,i=1){const n=new v;return n._coord=I(t/i,r/i,o/i,1),n}static fromVector(t){const r=new v;return r._coord=I(t.x,t.y,t.z,1),r}static fromVec4(t){const r=new v,o=t[3]!==0?t[3]:1;return r._coord=I(t[0]/o,t[1]/o,t[2]/o,1),r}static fromVec3(t){const r=new v;return r._coord=I(t[0],t[1],t[2],1),r}toString(){return`Point(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new v;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),r}unMap(t){const r=new v;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}static relative(t,r){return t.map(r)}static absolute(t,r){return t.unMap(r)}subtract(t){const r=$t();return jt(r,this._coord,t._coord),S.fromVec4(r)}scale(t){const r=ot();return ve(r,this.vec3(),t),v.fromVec3(r)}add(t){const r=new v;return Yt(r._coord,this._coord,t.vec4()),r}isPoint(){return!0}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get coordinates(){return[...this._coord.values()]}get triplet(){return[this.x,this.y,this.z]}buffer(){return new Float32Array(this.coordinates)}vec3(){return pt(this.x,this.y,this.z)}vec4(){return I(this.x,this.y,this.z,1)}}const St=class W{constructor(){D(this,"_coord"),this._coord=I(1,1,1,0)}static get bufferSize(){return 4*4}static fromVector(t){const r=new W;return r._coord=I(t.x,t.y,t.z,0),rt(r._coord,r._coord),r}static fromPoints(t,r){const o=new W;return o._coord=I(t.x-r.x,t.y-r.y,t.z-r.z,0),rt(o._coord,o._coord),o}fromPoint(t){return W.fromValues(...t.triplet)}static fromValues(t,r,o){const i=I(t,r,o,0);return rt(i,i),W.fromVec4(i)}static fromVec4(t){const r=new W,o=t[3]!==0?t[3]:1;return r._coord=I(t[0]/o,t[1]/o,t[2]/o,0),rt(r._coord,r._coord),r}static fromVec3(t){const r=new W;return r._coord=I(t[0],t[1],t[2],0),rt(r._coord,r._coord),r}toString(){return`UnitVector(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new W;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),rt(r._coord,r._coord),r}unMap(t){const r=new W;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),rt(r._coord,r._coord),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}invert(){const t=new W;return be(t._coord,this._coord),t}scale(t){return S.fromValues(this.x*t,this.y*t,this.z*t)}add(t){return S.fromValues(this.x+t.x,this.y+t.y,this.z+t.z)}isUnitVector(){return!0}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get length(){return 1}get coordinates(){return[...this._coord.values()]}get triplet(){return[this.x,this.y,this.z]}crossProduct(t){return S.fromVec3(this.triplet).crossProduct(t)}buffer(){return new Float32Array(this.coordinates)}vec3(){return pt(this.x,this.y,this.z)}};D(St,"crossProduct",(e,t)=>{const r=ot();return lt(r,e.vec3(),t.vec3()),St.fromVec3(r)});let w=St;const At=e=>e.isUnitVector();class T{constructor(){D(this,"_direct"),D(this,"_inverse"),D(this,"_isIdentity",!0),this._direct=J(),this._inverse=J(),z(this._inverse,this._direct)}static get bufferSize(){return 16*4}static world(){return new T}static identity(){return new T}static fromRotation(t){const r=new T;return de(r._direct,t.quat),z(r._inverse,r._direct),r._isIdentity=!1,r}static fromMat4(t){const r=new T,o=J();return z(o,t),r._direct=K(t),r._inverse=K(o),r._isIdentity=!1,r}static lookAt(t,r,o){const i=new T;return qt(i._direct,t.vec3(),r.vec3(),o.vec3()),z(i._inverse,i._direct),i._isIdentity=!1,i}static perspective(t,r,o,i){const n=new T;return fe(n._direct,t,r,o,i),z(n._inverse,n._direct),n._isIdentity=!1,n}static invert(t){const r=new T;return r._direct=K(t._inverse),r._inverse=K(t._direct),r._isIdentity=!1,r}static translation(t,r,o){const i=new T;return ct(i._direct,i._direct,[t,r,o]),z(i._inverse,i._direct),i._isIdentity=!1,i}static move(t){const r=new T;return ct(r._direct,r._direct,t.vec3()),z(r._inverse,r._direct),r._isIdentity=!1,r}static rotationX(t){const r=new T;return kt(r._direct,r._direct,t),z(r._inverse,r._direct),r._isIdentity=!1,r}static rotationY(t){const r=new T;return Zt(r._direct,r._direct,t),z(r._inverse,r._direct),r._isIdentity=!1,r}static rotationZ(t){const r=new T;return Ot(r._direct,r._direct,t),z(r._inverse,r._direct),r._isIdentity=!1,r}static scale(t,r,o){const i=new T;return ae(i._direct,i._direct,[t,r,o]),z(i._inverse,i._direct),i._isIdentity=!1,i}static rotoTranslation(t,r){const o=new T;return ce(o._direct,t.quat,r.vec3()),z(o._inverse,o._direct),o._isIdentity=!1,o}static fromRotationTranslationScale(t,r,o){const i=new T;return he(i._direct,t.quat,r.vec3(),o.vec3()),z(i._inverse,i._direct),i._isIdentity=!1,i}isFrame(){return!1}get values(){return this._direct.values()}get inverseValues(){return this._inverse.values()}buffer(){return new Float32Array(this._direct.values())}inverseBuffer(){return new Float32Array(this._inverse.values())}apply(t){return t.map(this)}compose(t){const r=new T,{_direct:o,_inverse:i}=this,{_direct:n,_inverse:s}=t;return gt(r._direct,n,o),gt(r._inverse,i,s),r._isIdentity=!1,r}transpose(){const t=new T;return se(t._direct,this._direct),z(t._inverse,t._direct),t._isIdentity=!1,t}translation(t,r,o){const i=T.translation(t,r,o);return this.compose(i)}rotationX(t){const r=T.rotationX(t);return this.compose(r)}rotationY(t){const r=T.rotationY(t);return this.compose(r)}rotationZ(t){const r=T.rotationZ(t);return this.compose(r)}scale(t,r,o){const i=T.scale(t,r,o);return this.compose(i)}invert(){const t=new T;return t._direct=K(this._inverse),t._inverse=K(this._direct),t._isIdentity=this._isIdentity,t}get directMatrix(){return this._direct}get inverseMatrix(){return this._inverse}get isIdentity(){return this._isIdentity}get scaleVector(){const t=ot();return ue(t,this._direct),S.fromValues(t[0],t[1],t[2])}get positionVector(){const t=ot();return le(t,this._direct),S.fromValues(t[0],t[1],t[2])}}const Ct=class Q{constructor(){D(this,"_direct"),D(this,"_inverse"),this._direct=J(),this._inverse=J(),Pt(this._direct),Pt(this._inverse)}static bufferSize(){return 16*4}static world(){return new Q}static translation(t){const r=new Q,o=J();return ct(o,o,t.vec3()),r._direct=o,z(r._inverse,r._direct),r}static rotationX(t,r){const o=new Q,i=J();return ct(i,i,t.vec3()),kt(i,i,r),o._direct=i,z(o._inverse,o._direct),o}static rotationY(t,r){const o=new Q,i=J();return ct(i,i,t.vec3()),Zt(i,i,r),o._direct=i,z(o._inverse,o._direct),o}static rotationZ(t,r){const o=new Q,i=J();return ct(i,i,t.vec3()),Ot(i,i,r),o._direct=i,z(o._inverse,o._direct),o}static lookAt(t,r,o){const i=new Q;return qt(i._inverse,t.vec3(),r.vec3(),o.vec3()),z(i._direct,i._inverse),i}isFrame(){return!0}toString(){return`Frame(${this.origin}, ${this.i}, ${this.j}, ${this.k})`}map(t){return this.compose(t)}unMap(t){return this.compose(t.invert())}compose(t){const r=new Q,{_direct:o}=this,{_direct:i}=t;return gt(r._direct,i,o),z(r._inverse,r._direct),r}toTransform(){return T.fromMat4(this._inverse)}invert(){const t=new Q;return t._direct=K(this._inverse),t._inverse=K(this._direct),t}get directMatrix(){return K(this._direct)}get inverseMatrix(){return K(this._inverse)}get i(){return w.fromValues(this._direct[0],this._direct[1],this._direct[2])}get j(){return w.fromValues(this._direct[4],this._direct[5],this._direct[6])}get k(){return w.fromValues(this._direct[8],this._direct[9],this._direct[10])}get o(){return v.fromValues(this._direct[12],this._direct[13],this._direct[14],this._direct[15])}get origin(){return v.fromValues(this._inverse[12],this._inverse[13],this._inverse[14],this._inverse[15])}relative(t){if(t&&Le(t)){const r=new Q;return gt(r._direct,t.inverseMatrix,this.directMatrix),z(r._inverse,r._direct),r}return t.relative(this)}absolute(t){return t.compose(this)}};D(Ct,"from2Vectors",(e,t,r)=>{const o=new Ct,i=At(t)?t:w.fromVector(t),n=w.crossProduct(i,At(r)?r:w.fromVector(r)),s=[...w.crossProduct(n,i).coordinates,...n.coordinates,...i.coordinates,...e.coordinates];return o._direct=ne(...s),z(o._inverse,o._direct),o});let Lt=Ct;const Le=e=>e&&e.isFrame!==void 0?e.isFrame():!1;let tt=class B{constructor(){D(this,"_direct"),D(this,"_inverse"),this._direct=_t(),this._inverse=_t()}static identity(){return new B}static fromValues(t,r,o,i){const n=new B;return n._direct=Ce(t,r,o,i),et(n._inverse,n._direct),n}static fromAngles(t,r,o){return B.rotationX(t).rotateY(r).rotateZ(o)}static fromQuat(t){const r=new B;return r._direct=ft(t),et(r._inverse,r._direct),r}static fromArray(t){const r=new B;return r._direct=ft(t),et(r._inverse,r._direct),r}static fromTransform(t){const r=Rt();ie(r,t.directMatrix);const o=new B;return o._direct=Ht(o._direct,r),et(o._inverse,o._direct),o}static rotationX(t){const r=new B;return Te(r._direct,r._direct,t),et(r._inverse,r._direct),r}static rotationY(t){const r=new B;return Pe(r._direct,r._direct,t),et(r._inverse,r._direct),r}static rotationZ(t){const r=new B;return Se(r._direct,r._direct,t),et(r._inverse,r._direct),r}rotateX(t){return this.compose(B.rotationX(t))}rotateY(t){return this.compose(B.rotationY(t))}rotateZ(t){return this.compose(B.rotationZ(t))}inverse(){const t=new B;return t._direct=ft(this._inverse),t._inverse=ft(this._direct),t}compose(t){const r=new B;return Ve(r._direct,this._direct,t._direct),et(r._inverse,r._direct),r}get quat(){return this._direct}};const G=e=>e/180*Math.PI;var ze=Object.defineProperty,De=(e,t,r)=>t in e?ze(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,P=(e,t,r)=>(De(e,typeof t!="symbol"?t+"":t,r),r);const Ft=()=>{let e=0,t=performance.now(),r=0;const o=[];return{getFPS:()=>o.reduce((i,n)=>i+n,0)/o.length,measureFPS:()=>{const i=performance.now();return e=i-t,e<=1?o[r]:(r=(r+1)%10,o[r]=1e3/e,t=i,e)},getLastTimeSpan:()=>e}},Ae=async({device:e},t)=>{const r=e.createShaderModule({code:t});return(await r.getCompilationInfo()).messages.forEach(o=>{let i=o.message;o.lineNum&&(i=`Line ${o.lineNum}:${o.linePos} - "${t.substr(o.offset,o.length+40)}"
`+o.message),console.error("WGSL error: ",i)}),r},Fe=e=>{const t=3*T.bufferSize+8+4*(2*S.bufferSize)+4*(S.bufferSize+v.bufferSize),r=4,o=r*(2*S.bufferSize)+r*(S.bufferSize+v.bufferSize)+4*4+2*4,i=e.device.createBuffer({label:"TransBuffer",size:t+t%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),n=e.device.createBuffer({label:"LightBuffer",size:o+o%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s=[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],a=e.device.createBindGroupLayout({label:"transformations",entries:s}),c=[{binding:0,resource:{buffer:i}},{binding:1,resource:{buffer:n}}],u=e.device.createBindGroup({label:"SceneData",layout:a,entries:c});return[a,u,[i,n]]},Ie=e=>{const t=2*T.bufferSize,r=e.device.createBuffer({label:"TransBuffer",size:t+t%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],i=e.device.createBindGroupLayout({label:"modelTransf",entries:o}),n=[{binding:0,resource:{buffer:r}}],s=e.device.createBindGroup({label:"SceneData",layout:i,entries:n});return[i,s,[r]]},Ee=e=>{const t=e.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),r=e.device.createBuffer({size:4*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],i=e.device.createBindGroupLayout({label:"color",entries:o}),n=[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:r}}],s=e.device.createBindGroup({label:"color",layout:i,entries:n});return[i,s,[t,r]]},Ge=(e,t,r)=>{const{device:o}=e,i={addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",maxAnisotropy:1},n=o.createSampler(i),s={addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",maxAnisotropy:1},a=o.createSampler(s),c=t.map(p=>p.view),u=[...c.map((p,f)=>({binding:f,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}})),{binding:4,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}}];r&&u.push({binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:6,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}});const l=e.device.createBindGroupLayout({label:"texture",entries:u}),d=[...c.map((p,f)=>({binding:f,resource:p})),{binding:4,resource:n}];r&&d.push({binding:5,resource:r.view},{binding:6,resource:a});const h=e.device.createBindGroup({label:"texture",layout:l,entries:d});return[l,h]},Be=(e,t,r)=>{const{device:o}=e,[i,n,s]=Fe(e),[a,c,u]=Ee(e),[l,d,h]=Ie(e),p=t.length>0||r!==void 0,[f,m]=p?Ge(e,t,r):[void 0,void 0],g=f?[i,a,l,f]:[i,a,l],V={sceneGroup:n,colorGroup:c,modelGroup:d,texturesGroup:m},_={sceneBuffers:s,colorBuffers:u,modelBuffers:h};return[o.createPipelineLayout({bindGroupLayouts:g}),V,_]},wt=(e,t,r,o)=>{const{device:i,format:n}=e,s=r.map(a=>{const[c,u,l]=Be(e,a.materials,o),d={label:a.label,layout:c,multisample:{count:1},vertex:{module:t,entryPoint:a.vertexShader,buffers:[a.bufferLayout]},fragment:{module:t,entryPoint:a.fragmentShader,targets:[{format:n,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:a.primitives,cullMode:a.cullMode},depthStencil:{depthWriteEnabled:a.fragmentShader!=="fragmentEnvironmentShader",depthCompare:a.fragmentShader==="fragmentEnvironmentShader"?"always":"less",format:"depth24plus"}},h=i.createRenderPipeline(d),p={...d,label:`${a.label}-alt`,primitive:{topology:a.primitives==="line-list"?a.primitives:"line-strip",cullMode:"none"}},f=i.createRenderPipeline(p);return[a.id,{id:a.id,type:a.label,pipeline:h,altPipeline:f,geoRenderable:a,uniformBuffers:l,bindGroups:u}]});return new Map(s)},Ne=(e,t)=>{let r="none",o=[0,0],i=[0,0],n=[0,0];e.addEventListener("contextmenu",s=>{s.preventDefault()}),e.addEventListener("wheel",s=>{s.ctrlKey?t.tilt(s.deltaY):t.zoom(s.deltaY)}),e.addEventListener("pointerdown",s=>{e.setPointerCapture(s.pointerId),o=[s.offsetX,s.offsetY],i=[0,0],n=o,r=`${s.ctrlKey?"ctrl-":""}mouse-${s.button}`,t.move(r,{origin:o,direction:i},n)}),e.addEventListener("pointermove",s=>{if(r==="none")return;const a=[s.offsetX,s.offsetY];i=[a[0]-n[0],a[1]-n[1]],n=a,t.move(r,{origin:o,direction:i},n)}),e.addEventListener("pointerup",s=>{e.releasePointerCapture(s.pointerId);const a=[s.offsetX,s.offsetY];i=[a[0]-o[0],a[1]-o[1]],i[0]<=.9&&i[1]<=.9&&t.click("none",a),t.move("none",{origin:o,direction:i},a),r="none"})},Ue=(e,t,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const o=e.createBuffer({size:t.byteLength,usage:r,mappedAtCreation:!0});return new Float32Array(o.getMappedRange()).set(t),o.unmap(),o},It=(e,t,r)=>{const{canvas:o}=e,i=Xe(window.getComputedStyle(o).backgroundColor);return{colorAttachments:[{view:t,clearValue:i,loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:r,depthClearValue:1,depthStoreOp:"store",depthLoadOp:"clear"}}},Re=async e=>{const t=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!t)throw new Error("WebGPU:adapter is NOT available!");const r=await t.requestDevice();if(!r)throw new Error("WebGPU:device is NOT available!");const o=e.getContext("webgpu");if(!o)throw new Error("WebGPU:context from instantiated Canvas not available!");const i=navigator.gpu.getPreferredCanvasFormat();return o.configure({device:r,format:i,usage:GPUTextureUsage.RENDER_ATTACHMENT,alphaMode:"opaque"}),console.info("WegGPU: maxBindGroups:",r.limits.maxBindGroups),{context:o,device:r,canvas:e,format:i}},ke=e=>typeof e=="string",Ze=(e,[t,r],o)=>({view:o&&o.view?o.view(e.view):T.lookAt(v.fromValues(-5,-5,-5),v.fromValues(0,0,0),w.fromValues(0,0,1)),projection:o&&o.projection?o.projection(e.projection):T.perspective(Math.PI/5,t/r,.1,100)}),Oe=e=>e!=null,qe=`const MAX_DIR_LIGHTS: u32 = 4;
const MAX_POINT_LIGHTS: u32 = 4;
const PI = 3.1415926535897932384626433832795;

struct DirectionalLight {
  dir: vec4<f32>,
  col: vec4<f32>,
};

struct PointLight {
  pos: vec4<f32>,  // Position of the light
  col: vec4<f32>,  // Color of the light
};

struct SceneData {
  view: mat4x4<f32>,
  invertView: mat4x4<f32>,
  projection: mat4x4<f32>,
};

struct ModelData {
  model: mat4x4<f32>,
  modelInverseTranspose: mat4x4<f32>,
};

struct SceneLights {
  dirLights: array<DirectionalLight, MAX_DIR_LIGHTS>,
  pointLights: array<PointLight, MAX_POINT_LIGHTS>,
  ambient: vec4<f32>,
  numDirLights: u32,
  numPointLights: u32,
};

struct ObjectData {
  model: mat4x4<f32>,
};

struct TextFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) texCoord: vec2<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) tangent: vec3<f32>,
  @location(3) pos: vec3<f32>,
  @location(4) eye: vec3<f32>,
  @location(5) viewZ: f32,
  // @location(5) worldTangent: vec3<f32>,
};

struct ColorFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) tangent: vec3<f32>,
  @location(2) pos: vec3<f32>,
  @location(3) eye: vec3<f32>,
  @location(4) viewZ: f32,
};

struct ColorLineFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) viewZ: f32,
  @location(1) targetZ: f32,
  @location(2) color: vec4<f32>,
};

struct ColorData {
    color: vec4<f32>,
};

struct MaterialProperties {
    alpha: f32,
    bumpIntensity: f32,
    bumpPrecision: f32, // Precision for bump mapping
};



@group(0) @binding(0) var<uniform> sceneData: SceneData;
@group(0) @binding(1) var<uniform> sceneLights: SceneLights;
@group(1) @binding(0) var<uniform> myColor: ColorData;
@group(1) @binding(1) var<uniform> materialProperties: MaterialProperties;
@group(2) @binding(0) var<uniform> myModel: ModelData;
@group(3) @binding(0) var myTexture0: texture_2d<f32>;
@group(3) @binding(1) var myTexture1: texture_2d<f32>;
@group(3) @binding(2) var myTexture2: texture_2d<f32>;
@group(3) @binding(3) var myTexture3: texture_2d<f32>;
@group(3) @binding(4) var mySampler: sampler;
@group(3) @binding(5) var environmentTexture: texture_2d<f32>;
@group(3) @binding(6) var environmentSampler: sampler;

/**
  * Computes the diffuse color for a given point in the scene.
  *
  * @param eye The position of the camera.
  * @param pos The position of the point in the scene.
  * @param normal The normal of the point in the scene.
  * @param sceneLights The lights in the scene.
  * @return The diffuse color for the point.
  */
fn computeDiffuseColor(
    eye: vec3<f32>,
    pos: vec3<f32>,
    normal: vec3<f32>,
    sceneLights: SceneLights) -> vec3<f32> {
  var diffuse: vec3<f32> = sceneLights.ambient.rgb;
  for (var i: u32 = 0; i < sceneLights.numDirLights; i = i + 1) {
    if (sceneLights.dirLights[i].col.a == 0.0) {
      continue;
    }
    let lightDir: vec3<f32> = -normalize(sceneLights.dirLights[i].dir.xyz); //
    let lightColor: vec3<f32> = sceneLights.dirLights[i].col.rgb;
    var NdotL: f32 = max(dot(normal, lightDir), 0);
    let diffuseColor = NdotL * lightColor * sceneLights.dirLights[i].col.a; // Multiply by intensity

    diffuse = diffuse + diffuseColor;
  }
  for (var i: u32 = 0; i < sceneLights.numPointLights; i = i + 1) {
    if (sceneLights.pointLights[i].col.a == 0.0) {
        continue;
    }
    let dir = sceneLights.pointLights[i].pos.xyz - pos;
    let dist = length(dir);
    let attenuationRadius: f32 = 50.0; // Fixed attenuation radius
    let attenuation = 1.0 - clamp(pow( dist / attenuationRadius, 2.0), 0.0, 1.0 );

    let lightDir: vec3<f32> = normalize(dir);
    let lightColor: vec3<f32> = sceneLights.pointLights[i].col.rgb;
    var NdotL: f32 = max(dot(normal, lightDir), 0.0);
    let diffuseColor = NdotL * lightColor * sceneLights.pointLights[i].col.a; // Multiply by intensity

    diffuse = diffuse + diffuseColor * attenuation;
  }
  return clamp(diffuse, vec3<f32>(0, 0, 0), vec3<f32>(1.0, 1.0, 1.0));
}

/**
  * Computes the diffuse color for a given point in the scene.
  *
  * @param eye The position of the camera.
  * @param pos The position of the point in the scene.
  * @param normal The normal of the point in the scene.
  * @param sceneLights The lights in the scene.
  * @return The diffuse color for the point.
  */
fn computeSpecularColor(
    eye: vec3<f32>,
    pos: vec3<f32>,
    normal: vec3<f32>,
    sceneLights: SceneLights,
    surfaceColor: vec4<f32>
    ) -> vec3<f32> {
  var shininess: f32 = 12.0; // 92.0;
  var specular: vec3<f32> = vec3<f32>(0, 0, 0);
  let V = normalize(eye - pos); // Moved outside the loop
  for (var i: u32 = 0; i < sceneLights.numPointLights; i = i + 1) {
    if (sceneLights.pointLights[i].col.a == 0.0) {
      continue;
    }
    let intensity = sceneLights.pointLights[i].col.a; // Renamed 'power' to 'intensity' for clarity
    let dir = sceneLights.pointLights[i].pos.xyz - pos;
    let dist = length(dir);
    let attenuationRadius: f32 = 50.0; // Consistent with diffuse
    let attenuation = 1.0 - clamp(pow( dist / attenuationRadius, 2.0), 0.0, 1.0 );

    let lightDir: vec3<f32> = normalize(dir);
    let lightColor: vec3<f32> = sceneLights.pointLights[i].col.rgb;

    // Specular
    let R = normalize(reflect(-lightDir, normal));
    let specularIntensity = pow(max(dot(V, R), 0.0), shininess);
    let specularColor = specularIntensity * lightColor * intensity; // Multiply by intensity

    specular = specular + specularColor * attenuation;
  }

  return clamp(specular, vec3<f32>(0, 0, 0), vec3<f32>(1.0, 1.0, 1.0));
}


/**
  * Computes the distance from a point to a segment.
  *
  * @param point The point.
  * @param segmentStart The start of the segment.
  * @param segmentEnd The end of the segment.
  * @return The distance from the point to the segment.
  */
fn computeDistanceToSegment( point: vec3<f32>, segmentStart: vec3<f32>, segmentEnd: vec3<f32> ) -> f32 {
  let segment = segmentEnd - segmentStart;
  let segmentLength = length(segment);
  let segmentDirection = segment / segmentLength;
  let pointToStart = point - segmentStart;
  let projection = dot(pointToStart, segmentDirection);
  if (projection < 0.0) {
    return length(pointToStart);
  }
  if (projection > segmentLength) {
    return length(point - segmentEnd);
  }
  return length(pointToStart - projection * segmentDirection);
}

/**
 * Computes an attenuation factor based on the distance from the camera.
 * The attenuation is 1.0 for distances less than 50 units, and then
 * linearly decreases for distances between 50 and 850 units.
 *
 * @param d The distance from the camera.
 * @return The attenuation factor (0.0 to 1.0).
 */
fn computeDistanceToCameraAttenuation( d: f32 ) -> f32 {
  if ( d< 50 ) {
    return 1.0;
  }
  return 1 - clamp((d-49)/800 , 0.0, 1.0);
}

/**
 * Samples the environment texture using spherical projection.
 * Converts a 3D world direction vector to equirectangular texture coordinates
 * and samples the environment texture at infinite distance.
 *
 * @param worldDirection The 3D direction vector in world space
 * @return The environment color at the given direction
 */
fn sampleEnvironment(worldDirection: vec3<f32>) -> vec4<f32> {
  let dir = normalize(worldDirection);
  
  // Convert to spherical coordinates
  let phi = atan2(dir.z, dir.x);
  let theta = acos(dir.y);
  
  // Convert to equirectangular UV coordinates
  let u = (phi + PI) / (2.0 * PI);
  let v = theta / PI;
  
  return textureSample(environmentTexture, environmentSampler, vec2<f32>(u, v));
}

/**
 * Computes a normal perturbation vector for a grid-like bump effect.
 * This function simulates a grid pattern by perturbing the normal based on
 * the texture coordinates and predefined thickness and tilt values.
 *
 * @param stepU The step size for the U texture coordinate.
 * @param stepV The step size for the V texture coordinate.
 * @param tc The 2D texture coordinates (UV).
 * @param T The tangent vector of the surface.
 * @param B The bitangent vector of the surface.
 * @return The normal perturbation vector in tangent space.
 */
fn bumpGrid(stepU: f32, stepV: f32, tc: vec2<f32>, T: vec3<f32>, B: vec3<f32>  ) -> vec3<f32> {
  var ND = vec3<f32>(0,0,0);
  let tileDimU: f32 = 100.0 / stepU;
  let tileDimV: f32 = 100.0 / stepV;
  let normalTilt = 0.2;
  let tickness: f32 = 0.1;
  let uGrid =  (tc[0]*100 + tickness) % tileDimU;
  let vGrid =  (tc[1]*100 + tickness) % tileDimV;

  if ( uGrid < tickness ) {
    ND =  B * normalTilt;
  }
  else if ( uGrid < tickness * 2 ) {
    ND =  B * normalTilt * -1;
  }
  if ( vGrid < tickness ) {
    ND =  ND + T * normalTilt;
  }
  else if ( vGrid < tickness * 2 ) {
    ND =  ND + T * normalTilt * -1;
  }
  return ND;
}

/**
 * Computes a normal perturbation vector for a wave-like bump effect.
 * This function generates a wave pattern based on sine functions applied
 * to the texture coordinates, with configurable amplitude, frequency, and phase.
 *
 * @param tc The 2D texture coordinates (UV).
 * @param T The tangent vector of the surface.
 * @param B The bitangent vector of the surface.
 * @return The normal perturbation vector in tangent space.
 */
fn bumpWave(tc: vec2<f32>, T: vec3<f32>, B: vec3<f32>  ) -> vec3<f32> {
  // Constants for wave calculations
  let waveAmplitude1: f32 = 0.15;
  let waveFrequency1: f32 = PI * 90.0;
  let wavePhase1: f32 = 0.5;

  let waveAmplitude2: f32 = 0.05;
  let waveFrequency2: f32 = PI * 40.0;
  let wavePhase2: f32 = 1.0;

  let time: f32 = 0.0;

  // Calculate two sets of waves using both U and V texture coordinates
  let wave1U = waveAmplitude1 * sin(tc.x * waveFrequency1 + time + wavePhase1);
  let wave1V = waveAmplitude1 * cos(tc.y * waveFrequency1 + time + wavePhase1);

  let wave2U = waveAmplitude2 * sin(tc.x * waveFrequency2 + time + wavePhase2);
  let wave2V = waveAmplitude2 * cos((tc.y+tc.x) * waveFrequency2 + time + wavePhase2);

  // Combine the wave components to get the overall wave vector in the tangent space
  // let waveVector = vec2<f32>(wave1U + wave2U, wave1V + wave2V);

  return T * (wave1U + wave2U);

  // const step = PI * 10;
  // let delta = (
  //   sin(tc[0] * step)
  //   // (sin(tc[1] * 314) * 0.1)
  // ) * 0.3; // + sin(tc[1]*220.0) * 0.5;
  // return T * delta;
}

// ----------------------------------------------------------------------------------------------- Texture Shaders

@vertex
fn vertexTextureShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexNormal: vec3<f32>,
    @location(2) vertexTangent: vec3<f32>,
    @location(3) vertexTexCoord: vec2<f32>) -> TextFragment {
  var output: TextFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);
  var positionInViewSpace = sceneData.view * vertex;

  output.position = sceneData.projection * sceneData.view * vertex;
  output.texCoord = vec2<f32>(vertexTexCoord);
  output.normal = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexNormal, 0.0)).xyz);
  output.tangent = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexTangent, 0.0)).xyz);
  output.pos = vertex.xyz;
  output.eye = sceneData.invertView[3].xyz;
  output.viewZ = -positionInViewSpace.z;
  // output.worldTangent = normalize((modelMatrix * vec4(input.tangent, 0.0)).xyz);

  return output;
}

@fragment
fn fragmentTextureShader(in: TextFragment) -> @location(0) vec4<f32> {
  var N = normalize(in.normal);
  let T = normalize(in.tangent);
  let B = normalize(cross(N, T));
  var texColor: vec4<f32> = textureSample(myTexture0, mySampler, in.texCoord);
  let att: f32 = computeDistanceToCameraAttenuation(in.viewZ);

  // Normal mapping happen here
  // let ND = bumpGrid(6, in.texCoord, T, B);
  // let ND = bumpGrid(36, 18, in.texCoord, T, B);
  // N = normalize(N + ND);

  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, N, sceneLights );
  let specular: vec3<f32> = computeSpecularColor( in.eye, in.pos, N, sceneLights, texColor );

  let textMix = vec4<f32>(1.0 - materialProperties.alpha);
  let finalColor = mix(texColor, myColor.color, textMix); // mixed the two colors based on alpha.
  return clamp(
    vec4<f32>((finalColor.rgb * diffuse + specular) * att, max(finalColor.a, texColor.a)),
    vec4<f32>(0, 0, 0, 0.0), vec4<f32>(1.0, 1.0, 1.0, 1.0)
  );
}

@fragment
fn fragmentTextureBumpShader(in: TextFragment) -> @location(0) vec4<f32> {
  let texColor: vec4<f32> = textureSample(myTexture0, mySampler, in.texCoord);

  // Sample the bump map (just 1 channel since is a grayscale image)
  let heightCenter = textureSample(myTexture1, mySampler, in.texCoord).r;

  // Calculate the gradient of the height field
  let gradPrecision: f32 = materialProperties.bumpPrecision;
  let textDim = textureDimensions(myTexture1, 0);
  let texelSize = vec2<f32>(1.0 / f32(textDim.x), 1.0/ f32(textDim.y) ); // Assuming mip level 0
  let texelStartX = vec2<f32>(texelSize.x * gradPrecision, 0.0);
  let texelStartY = vec2<f32>(0.0, texelSize.y * gradPrecision);
  let heightLeft = textureSample(myTexture1, mySampler, in.texCoord - texelStartX);
  let heightRight = textureSample(myTexture1, mySampler, in.texCoord + texelStartX);
  let heightUp = textureSample(myTexture1, mySampler, in.texCoord + texelStartY);
  let heightDown = textureSample(myTexture1, mySampler, in.texCoord - texelStartY);

  let heightLeftVal = heightLeft.r + heightLeft.g + heightLeft.b;
  let heightRightVal = heightRight.r + heightRight.g + heightRight.b;
  let heightUpVal = heightUp.r + heightUp.g + heightUp.b;
  let heightDownVal = heightDown.r + heightDown.g + heightDown.b;


  // Gradient components
  let dU = (heightRightVal - heightLeftVal) / (  gradPrecision * gradPrecision * texelSize.x);
  let dV = (heightUpVal - heightDownVal) / ( gradPrecision * gradPrecision * texelSize.y) ;

  let gradientVector = vec3<f32>(dU* materialProperties.bumpIntensity, dV * materialProperties.bumpIntensity, 0.0);
  let N = normalize(in.normal);
  let T = normalize(in.tangent);
  let B = cross(N, T);
  let tangentSpaceNormal = vec3<f32>(gradientVector.x, gradientVector.y, 1.0);
  let newNormal = normalize(T * tangentSpaceNormal.x + B * tangentSpaceNormal.y + N * tangentSpaceNormal.z);
  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, newNormal, sceneLights );
  let specular: vec3<f32> = computeSpecularColor( in.eye, in.pos, newNormal, sceneLights, texColor );

  let att: f32 = computeDistanceToCameraAttenuation(in.viewZ);

  let textMix = vec4<f32>(1.0 - materialProperties.alpha);
  let finalColor = mix(texColor, myColor.color, textMix); // mixed the two colors based on alpha.
  return clamp(
    vec4<f32>((finalColor.rgb * diffuse + specular) * att, max(finalColor.a, texColor.a)),
    vec4<f32>(0, 0, 0, 0.0), vec4<f32>(1.0, 1.0, 1.0, 1.0)
  );
}


// ----------------------------------------------------------------------------------------------- Environment Shaders

struct EnvironmentFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) worldDirection: vec3<f32>,
};

@vertex
fn vertexEnvironmentShader(
    @location(0) vertexPosition: vec3<f32>) -> EnvironmentFragment {
  var output: EnvironmentFragment;
  
  // Render fullscreen quad at far plane but inside NDC
  output.position = vec4<f32>(vertexPosition.xy, 0.999999, 1.0);
  
  // Convert clip space position to world direction
  // Inverse projection to get view space direction
  let invProj = vec4<f32>(vertexPosition.xy, 1.0, 1.0);
  let viewDir = vec4<f32>(invProj.xy / vec2<f32>(sceneData.projection[0][0], sceneData.projection[1][1]), -1.0, 0.0);
  
  // Transform to world space using inverse view matrix
  output.worldDirection = (sceneData.invertView * viewDir).xyz;
  
  return output;
}

@fragment
fn fragmentEnvironmentShader(in: EnvironmentFragment) -> @location(0) vec4<f32> {
  return sampleEnvironment(normalize(in.worldDirection));
}

// ----------------------------------------------------------------------------------------------- Color Shaders

@vertex
fn vertexColorShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexNormal: vec3<f32>,
    @location(2) vertexTangent: vec3<f32>,
    ) -> ColorFragment {
  var output: ColorFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);
  var positionInViewSpace = sceneData.view * vertex;
  var bias = 0.002 * positionInViewSpace.z;

  var biasedPositionInViewSpace = positionInViewSpace - vec4<f32>(0.0, 0.0, bias, 0.0);

  output.normal = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexNormal, 0.0)).xyz);
  output.tangent = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexTangent, 0.0)).xyz);
  output.position = sceneData.projection * sceneData.view * vertex;
  output.pos = vertex.xyz;
  output.eye = sceneData.invertView[3].xyz;
  output.viewZ = -biasedPositionInViewSpace.z;

  return output;
}

@fragment
fn fragmentColorShader(in: ColorFragment) -> @location(0) vec4<f32> {
  var N = normalize(in.normal);
  let T = normalize(in.tangent);
  let B = normalize(cross(N, T));

  let att: f32 =  computeDistanceToCameraAttenuation(in.viewZ);

  // Compute a normal delta based on a 10x10 grid
  // let ND = bumpGrid(6, in.texCoord, T, B);
  // N = normalize(N + ND);

  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, N, sceneLights );
  let specular: vec3<f32> = computeSpecularColor( in.eye, in.pos, N, sceneLights, myColor.color );

  return clamp(
    vec4<f32>((myColor.color.rgb * diffuse.rgb + specular) * att, myColor.color.a),
    vec4<f32>(0, 0, 0, 0.0), vec4<f32>(1.0, 1.0, 1.0, 1.0)
  );

}


@vertex
fn vertexLineShader(
  @location(0) vertexPosition: vec3<f32>,
  @location(1) vertexColor: vec4<f32>
) -> ColorLineFragment {
  var output: ColorLineFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);

  let eye  = vec4<f32>(sceneData.invertView[3].xyz, 1.0);

  let eyeInViewSpace = sceneData.view * eye;
  let positionInViewSpace = sceneData.view * vertex;
  let bias = 0.002 * positionInViewSpace.z;
  let biasedPositionInViewSpace = positionInViewSpace - vec4<f32>(0.0, 0.0, bias, 0.0);
  output.viewZ = -biasedPositionInViewSpace.z;
  output.targetZ = -eyeInViewSpace.z;
  output.position = sceneData.projection * biasedPositionInViewSpace;
  output.color = vertexColor;

  return output;
}


@fragment
fn fragmentLineShader(in: ColorLineFragment) -> @location(0) vec4<f32> {
  let att: f32 = computeDistanceToCameraAttenuation(in.viewZ);

  return vec4<f32>(in.color.rgb * att, in.color.a * att);
}
`,$e="",Ye=e=>{const{canvas:t,context:r,device:o}=e;let[i,n]=[t.width,t.height];return new ResizeObserver(s=>{const{width:a,height:c}=s[0].contentRect;[i,n]=[Math.round(a),Math.round(c)]}).observe(t.parentElement),s=>{var a,c;if(i===t.width&&n===t.height){const d=r.getCurrentTexture(),h=s.colorAttachments;return h[0].view=d.createView({label:"ColorView"}),s}t.width=i,t.height=n,(a=e._colorTexture)==null||a.destroy(),(c=e._depthTexture)==null||c.destroy(),e._depthTexture=o.createTexture({label:"DepthTexture",sampleCount:1,size:[i,n,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),e._colorTexture=o.createTexture({label:"ColorTexture",size:{width:i,height:n,depthOrArrayLayers:1},sampleCount:1,format:e.format,usage:GPUTextureUsage.RENDER_ATTACHMENT});const u=s.colorAttachments;u[0].view=e._colorTexture.createView({label:"ColorView"});const l=s.depthStencilAttachment;return l.view=e._depthTexture.createView({label:"DepthView"}),s}};class Dt{constructor(t,r,o,i){P(this,"canvas"),P(this,"context"),P(this,"device"),P(this,"format"),P(this,"_handleOnRender"),P(this,"_vertexCount",0),P(this,"_activeRenderLoop",!1),P(this,"_pipelineMode","default"),P(this,"_shaderModule"),P(this,"_pipelines",new Map),P(this,"_transformations",{projection:T.identity(),view:T.identity()}),P(this,"_cameraTransHandler"),P(this,"_lightsHandler"),P(this,"_modelHandlers",{}),P(this,"_fps",Ft()),P(this,"_rebuildViewTexture"),P(this,"_colorTexture"),P(this,"_depthTexture"),P(this,"_ambientLight",[.3,.3,.3,1]),P(this,"_dirLights",[{dir:w.fromValues(0,0,1),col:[.4,.4,.4,0]},{dir:w.fromValues(1,1,1),col:[.4,.3,.3,0]},{dir:w.fromValues(1,0,0),col:[.5,.5,.5,0]},{dir:w.fromValues(-1,-1,-1),col:[.3,.3,.3,0]}]),P(this,"_pointLights",[{pos:v.fromValues(-12,12,8),col:[.5,.5,.2,0]},{pos:v.fromValues(12,12,8),col:[.4,.2,.2,0]},{pos:v.fromValues(-12,-12,8),col:[.2,.2,.5,0]},{pos:v.fromValues(12,-12,8),col:[.5,.1,.5,0]}]),P(this,"_environmentMaterial"),P(this,"render",()=>{const{device:n}=this;this._vertexCount=0,this._handleOnRender&&this._handleOnRender(this);let s=It(this,this._colorTexture.createView(),this._depthTexture.createView());this._rebuildViewTexture&&(s=this._rebuildViewTexture(s));const a=n.createCommandEncoder(),c=a.beginRenderPass(s),u=this._fps.getLastTimeSpan();this.updateLights(u),this.pipelines.filter(({geoRenderable:l})=>l.fragmentShader==="fragmentEnvironmentShader").forEach((l,d)=>{this.renderPipeline(l,d,c,u)}),this.pipelines.filter(({geoRenderable:l})=>l.colors[0][3]===1&&l.fragmentShader!=="fragmentEnvironmentShader").forEach((l,d)=>{this.renderPipeline(l,d,c,u)}),this.pipelines.filter(({geoRenderable:l})=>l.colors[0][3]<1&&l.fragmentShader!=="fragmentEnvironmentShader").forEach((l,d)=>{this.renderPipeline(l,d,c,u)}),c.end(),n.queue.submit([a.finish()])}),this.canvas=t,this.context=r,this.device=o,this.format=i,this._rebuildViewTexture=Ye(this),this._colorTexture=o.createTexture({size:{width:t.width,height:t.height,depthOrArrayLayers:1},sampleCount:1,format:this.format,usage:GPUTextureUsage.RENDER_ATTACHMENT}),this._depthTexture=o.createTexture({label:"DepthTexture",sampleCount:1,size:[t.width,t.height,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.device.lost.then(()=>{console.log("WebGPU:device lost")})}get vertexCount(){return this._vertexCount}get fps(){return this._fps.getFPS()}get dirLights(){return this._dirLights}get pontLights(){return this._pointLights}get(...t){return t.map(r=>this._pipelines.get(r)).filter(Oe).map(r=>r.geoRenderable)}setAmbientLight(t){this._ambientLight=t}setLight(t,r,o){switch(t){case"directional":this._dirLights[r]=o;break;case"point":this._pointLights[r]=o;break}}static async build(t){return Re(t).then(({canvas:r,context:o,device:i,format:n})=>new Dt(r,o,i,n))}setPipelineMode(t){this._pipelineMode=t}get pipelines(){return[...this._pipelines.values()]}getScene(){return[...this._pipelines.values()].map(({geoRenderable:t})=>t)}async setupShaders(t){if(this._shaderModule)return this;let r;if(ke(t))switch(t){case"standard-3d":r=qe;break;case"standard-2d":default:r=$e;break}else r=t.source;return this._shaderModule=await Ae(this,r),this}setScene(t){if(!this._shaderModule)throw new Error("WebGPU:shader module is NOT available!");t.forEach(r=>{r.buildGpuBuffer(this)}),this._pipelines=wt(this,this._shaderModule,t,this._environmentMaterial),It(this,this._colorTexture.createView(),this._depthTexture.createView())}addToScene(t){if(!this._shaderModule)throw new Error("WebGPU:shader module is NOT available!");t.forEach(r=>{r.buildGpuBuffer(this)}),wt(this,this._shaderModule,t,this._environmentMaterial).forEach((r,o)=>{this._pipelines.set(o,r)})}removeFromScene(t){return this._pipelines.delete(t)}clearScene(){this._pipelines.clear()}setEnvironmentMaterial(t){if(this._environmentMaterial=t,this._pipelines.size>0&&this._shaderModule){const r=this.getScene();this._pipelines=wt(this,this._shaderModule,r,this._environmentMaterial)}}getEnvironmentMaterial(){return this._environmentMaterial}captureMouseMotion(t){Ne(this.canvas,{move:(t==null?void 0:t.move)??((r,o,i)=>{}),click:(t==null?void 0:t.click)??((r,o)=>{}),zoom:(t==null?void 0:t.zoom)??(r=>{}),tilt:(t==null?void 0:t.tilt)??(r=>{})})}sceneIntoBuffer(t){const{device:r}=this,{projection:o,view:i}=this._transformations,n=i.invert();let s=0;r.queue.writeBuffer(t[0],s,i.buffer()),s+=T.bufferSize,r.queue.writeBuffer(t[0],s,n.buffer()),s+=T.bufferSize,r.queue.writeBuffer(t[0],s,o.buffer()),s+=T.bufferSize;let a=0;const c=new Float32Array(this._dirLights.flatMap(({dir:d,col:h})=>[...d.coordinates,...h]));r.queue.writeBuffer(t[1],a,c),a+=c.byteLength;const u=new Float32Array(this._pointLights.flatMap(({pos:d,col:h})=>[...d.coordinates,...h]));r.queue.writeBuffer(t[1],a,u),a+=u.byteLength;const l=new Float32Array(this._ambientLight);r.queue.writeBuffer(t[1],a,l),a+=l.byteLength,r.queue.writeBuffer(t[1],a,new Uint32Array([this._dirLights.length,this._pointLights.length]))}updateLights(t){if(!this._lightsHandler)return;const{dirLights:r,posLights:o}=this._lightsHandler;r&&r(t,this._dirLights),o&&o(t,this._pointLights)}onRender(t){this._handleOnRender=t}renderPipeline(t,r,o,i){const{pipeline:n,altPipeline:s,uniformBuffers:a,bindGroups:c,geoRenderable:u}=t,{device:l}=this;if(r===0&&(this.sceneIntoBuffer(a.sceneBuffers),o.setBindGroup(0,c.sceneGroup)),u.display==="none")return;const d=this._pipelineMode==="default"?n:s;o.setPipeline(d),this._modelHandlers[u.id]&&u.transform(i,this._modelHandlers[u.id]),l.queue.writeBuffer(a.modelBuffers[0],0,u.transformationData),o.setBindGroup(2,c.modelGroup),c.texturesGroup&&o.setBindGroup(3,c.texturesGroup),u.buffers.forEach((h,p)=>{const f=new Float32Array(u.colors[p]);l.queue.writeBuffer(a.colorBuffers[0],0,f),l.queue.writeBuffer(a.colorBuffers[1],0,new Float32Array([u.materialProperties.alpha,u.materialProperties.bumpIntensity,u.materialProperties.bumpPrecision,1])),o.setBindGroup(1,c.colorGroup);const m=u.getVertexCountPerStrip(p);this._vertexCount+=m,o.setVertexBuffer(0,h),o.draw(m)})}renderLoop(){const{width:t,height:r}=this.canvas;this._transformations=Ze(this._transformations,[t,r],this._cameraTransHandler),this.render(),this._fps.measureFPS(),this._activeRenderLoop&&requestAnimationFrame(this.renderLoop.bind(this))}beginRenderLoop(t){this._fps=Ft(),this._cameraTransHandler=t==null?void 0:t.camera,this._lightsHandler=t==null?void 0:t.lights,this._modelHandlers=(t==null?void 0:t.models)??{},this._activeRenderLoop=!0,this.renderLoop()}setLightsHandler(t){this._lightsHandler=t}endRenderLoop(){this._activeRenderLoop=!1}}let ut=new Map;const je=async e=>{var t,r;if(!navigator.gpu)return Promise.reject(new Error("WebGPU is not supported in this browser!"));const o=(t=ut.get(e.id))==null?void 0:t.gpu;if(o)return Promise.resolve(o);if((r=ut.get(e.id))!=null&&r.initializing)return new Promise((n,s)=>{setTimeout(()=>{var a;const c=(a=ut.get(e.id))==null?void 0:a.gpu;if(c)return console.warn("WebGPU connection already initialized. Reusing previous connection."),n(c);s(new Error("WebGPU already initialization is taking too long!"))},100)});ut.set(e.id,{initializing:!0});const i=await Dt.build(e);return ut.set(e.id,{initializing:!1,gpu:i}),Promise.resolve(i)},He=(e,t,r)=>{const{device:o}=e,i="rgba8unorm",n={label:t,size:[r.width,r.height,1],format:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT},s=o.createTexture(n);o.queue.copyExternalImageToTexture({source:r},{texture:s},[r.width,r.height]);const a=s.createView({label:`${t}-view`});return{name:t,texture:s,view:a}},Xe=e=>{let t=[];const r=/rgba?\(([^)]+)\)/.exec(e);if(r&&r[1]&&(t=r[1].split(",").map(a=>parseFloat(a.trim()))),t.length<3)throw new Error("Invalid RGB/RGBA format");const o=t[0]/255,i=t[1]/255,n=t[2]/255,s=t.length===4?t[3]:1;return{r:o,g:i,b:n,a:s}},Wt=async(e,t)=>{const r=new URL(t,window.location.href);return new Promise((o,i)=>{const n=new Image;n.src=r.href,n.onerror=s=>{i(s)},n.onload=()=>{createImageBitmap(n).then(s=>He(e,r.pathname,s)).then(s=>o([e,s]))}})},Et=async(e,t)=>Promise.all(t.map(r=>Wt(e,r))).then(r=>Promise.resolve([e,r.map(([,o])=>o)])),H=4;class nt{constructor(t,r,o){P(this,"_body",null),P(this,"_id"),P(this,"_bufferData",null),P(this,"_vertices",[]),P(this,"_vertexColors",[]),P(this,"_vertexNormals",[]),P(this,"_vertexTangents",[]),P(this,"_vertexTextureCoords",[]),P(this,"_stripColors",[]),P(this,"_vertexByteSize",0),P(this,"_buffers",[]),P(this,"_bufferLayout",null),P(this,"_topology","triangle-list"),P(this,"_cullMode","back"),P(this,"_alpha",1),P(this,"_bumpIntensity",.2),P(this,"_bumpPrecision",2),P(this,"_materials",[]),P(this,"_transformation",{rotation:tt.identity(),scale:S.fromValues(1,1,1),translation:S.fromValues(0,0,0)}),P(this,"_transformationData"),P(this,"display","full"),this._id=t,this._topology=r,this._vertexByteSize=3*4,this._stripColors=o.colors??[[0,0,0,0]],this._alpha=o.alpha??1,this._bumpIntensity=o.bumpIntensity??.2,this._bumpPrecision=o.bumpPrecision??2,this._transformationData=new Float32Array(32)}get id(){return this._id}get materialProperties(){return{alpha:this._alpha,bumpIntensity:this._bumpIntensity,bumpPrecision:this._bumpPrecision}}get label(){return this._topology}get translationVector(){return this._transformation.translation??S.fromValues(0,0,0)}get orientationRotation(){return this._transformation.rotation??tt.identity()}get scaleVector(){return this._transformation.scale??S.fromValues(1,1,1)}get hasTextures(){return this._vertexTextureCoords.length>0&&this._materials.length>0}get materials(){return this._materials}get vertexShader(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this.hasTextures?"vertexTextureShader":"vertexColorShader":"vertexLineShader"}get fragmentShader(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this._materials.length===2?"fragmentTextureBumpShader":this.hasTextures?"fragmentTextureShader":"fragmentColorShader":"fragmentLineShader"}get colors(){return this._stripColors}get primitives(){return this._topology}get cullMode(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this._cullMode:"none"}get vertexCount(){return this._vertices.reduce((t,r)=>t+r.length/3,0)}get body(){return this._body}get transformation(){return T.fromRotationTranslationScale(this._transformation.rotation??tt.identity(),this._transformation.translation??S.fromValues(0,0,0),this._transformation.scale??S.fromValues(1,1,1))}get transformationData(){const t=this.transformation;return this._transformationData.set([...t.values]),this._transformationData.set([...t.transpose().invert().values],16),this._transformationData}addMaterial(t){return this._materials.push(t),this.materials.length-1}setBody(t){return this._body=t,this}scale(t){return this._transformation.scale=this.scaleVector.multiply(t),this}translate(t){return this._transformation.translation=this.translationVector.add(t),this}rotate(t){return this._transformation.rotation=this.orientationRotation.compose(t),this}rotoTranslate(t,r){const o=this._transformation;return o.rotation=t,o.translation=r,this}transform(t,r){return this._transformation=r(t,this._transformation),this}getVertexCountPerStrip(t){return this._vertices[t].length/3}get vertexByteSize(){return this._vertexByteSize}getByteSizePerStrip(t=0){return this._vertices[t].length*H+(this._vertexColors.length>0?this._vertexColors[t].length*H:0)+(this._vertexNormals.length>0?this._vertexNormals[t].length*H:0)+(this._vertexTangents.length>0?this._vertexTangents[t].length*H:0)+(this._vertexTextureCoords.length>0?this._vertexTextureCoords[t].length*H:0)}setCullMode(t){return this._cullMode=t,this}addVertices(t){this._vertices.push(t)}getBufferData(){return this._bufferData!==null?this._bufferData:(this._bufferData=this._vertices.map((t,r)=>{const o=[];for(let i=0,n=0,s=0,a=0;i<t.length;i+=3,n+=4,s+=3,a+=2){const c=[t[i+0],t[i+1],t[i+2]];this._vertexColors.length>r&&(c.push(this._vertexColors[r][n+0]),c.push(this._vertexColors[r][n+1]),c.push(this._vertexColors[r][n+2]),c.push(this._vertexColors[r][n+3])),this._vertexNormals.length>r&&(c.push(this._vertexNormals[r][s+0]),c.push(this._vertexNormals[r][s+1]),c.push(this._vertexNormals[r][s+2])),this._vertexTangents.length>r&&(c.push(this._vertexTangents[r][s+0]),c.push(this._vertexTangents[r][s+1]),c.push(this._vertexTangents[r][s+2])),this._vertexTextureCoords.length>r&&(c.push(this._vertexTextureCoords[r][a+0]),c.push(this._vertexTextureCoords[r][a+1])),o.push(...c)}return new Float32Array(o)}),this._bufferData)}get layouts(){let t=0,r=0;const o=[{shaderLocation:t,offset:0,format:"float32x3"}];return t+=1,r+=3*H,this._vertexColors.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x4"}),t+=1,r+=4*H),this._vertexNormals.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x3"}),t+=1,r+=3*H),this._vertexTangents.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x3"}),t+=1,r+=3*H),this._vertexTextureCoords.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x2"}),t+=1,r+=2*H),o}get buffers(){return this._buffers}get bufferLayout(){if(this._bufferLayout===null)throw new Error("TriangleData: Buffer layout is not available! - Did you call buildGpuBuffer() ?");return this._bufferLayout}buildGpuBuffer(t){this._buffers=this.getBufferData().map(r=>Ue(t.device,r)),this._bufferLayout={arrayStride:this.vertexByteSize,attributes:this.layouts}}addColors(t){this._vertexColors.length===0&&(this._vertexByteSize+=4*4),this._vertexColors.push(t)}addNormals(t){var r;this._vertexNormals.length===0&&(this._vertexByteSize+=3*4),(r=this._vertexNormals)==null||r.push(t)}addTangents(t){var r;this._vertexTangents.length===0&&(this._vertexByteSize+=3*4),(r=this._vertexTangents)==null||r.push(t)}addTextures(t){this._vertexTextureCoords.length===0&&(this._vertexByteSize+=2*4),this._vertexTextureCoords.push(t)}}const Gt=(e,t)=>{const r=e[t+0],o=e[t+1],i=e[t+2],n=S.fromPoints(o,r),s=S.fromPoints(i,r);return w.crossProduct(n,s)},We=(e,t)=>{const r=e[t-2],o=e[t-1],i=e[t-0],n=S.fromPoints(o,r),s=S.fromPoints(o,i);return w.crossProduct(s,n)},Qe=(e,t)=>{const r=[],o=e==="triangle-list"?3:1;if(e==="triangle-strip"){let i=Gt(t,0);r.push(i),r.push(i);for(let n=2;n<t.length;n+=1)We(t,n),r.push(i)}else for(let i=0;i<t.length-2;i+=o){const n=Gt(t,i);r.push(n),r.push(n),r.push(n)}return r},st=(e,t,r)=>{const{w:o,h:i}=t,n=o/2,s=i/2,a=e.origin,c=[],u=[],l=[],d=w.fromValues(0,0,1),h=w.fromValues(1,0,0);c.push(v.fromValues(a.x-n,a.y-s,0)),c.push(v.fromValues(a.x+n,a.y-s,0)),c.push(v.fromValues(a.x-n,a.y+s,0)),c.push(v.fromValues(a.x-n,a.y+s,0)),c.push(v.fromValues(a.x+n,a.y-s,0)),c.push(v.fromValues(a.x+n,a.y+s,0)),u.push(d,d,d,d,d,d),l.push(h,h,h,h,h,h);const p=[],{pos:f,size:m}=r,{w:g,h:V}=m,_=g/2,y=V/2;p.push({u:f.u+_,v:f.v-y}),p.push({u:f.u-_,v:f.v-y}),p.push({u:f.u+_,v:f.v+y}),p.push({u:f.u+_,v:f.v+y}),p.push({u:f.u-_,v:f.v-y}),p.push({u:f.u-_,v:f.v+y});const b=c.map(M=>M.absolute(e)),x=u.map(M=>M.absolute(e));return[b,x,l,p]},at=(e,t)=>{const r=t.transpose().invert();return[e[0].map(o=>o.map(t).triplet).flat(),e[1].map(o=>o.map(r).triplet).flat(),e[2].map(o=>o.map(r).triplet).flat(),e[3].map(o=>[o.u,o.v]).flat()]},Ke=(e,t,r=1)=>{const o=[],i=Math.PI*2,n=i/e,s=[],a=[],c=w.fromValues(0,0,1),u=Math.atan(1/.5),l=Math.PI/2-u,d=Math.sin(l),h=-.5+r;if(r>=1)for(let p=0;p<i;p+=n){const f=v.fromValues(0,0,-t),m=v.fromValues(.5*Math.cos(p),.5*Math.sin(p),t),g=v.fromValues(.5*Math.cos(p+n),.5*Math.sin(p+n),t);o.push(f),o.push(m),o.push(g);const V=w.fromValues(Math.cos(p),Math.sin(p),d),_=w.fromValues(Math.cos(p+n),Math.sin(p+n),d),y=V;s.push(y,V,_);const b=w.fromVector(y.crossProduct(c)),x=w.fromVector(V.crossProduct(c)),M=w.fromVector(_.crossProduct(c));a.push(b,x,M)}else{const p=(1-r)/Math.sin(u)*Math.cos(u);for(let f=0;f<i;f+=n){const m=v.fromValues(p*Math.cos(f),p*Math.sin(f),h),g=v.fromValues(.5*Math.cos(f),.5*Math.sin(f),t),V=v.fromValues(.5*Math.cos(f+n),.5*Math.sin(f+n),t),_=v.fromValues(p*Math.cos(f+n),p*Math.sin(f+n),h),y=w.fromValues(Math.cos(f),Math.sin(f),d),b=w.fromValues(Math.cos(f+n),Math.sin(f+n),d);o.push(m),o.push(g),o.push(V),s.push(y,y,b),o.push(V),o.push(_),o.push(m),s.push(b,b,y);const x=w.fromVector(y.crossProduct(c)),M=w.fromVector(b.crossProduct(c));a.push(y,x,M),a.push(b,M,x)}}return[o,s,a]},xt=(e,t,r,o=.5)=>{const i=o,n=w.fromValues(0,0,1),s=w.fromValues(0,0,-1),a=[],c=[],u=r==="up"?0:Math.PI*2,l=r==="up"?Math.PI*2/e:-Math.PI*2/e,d=r==="up"?h=>h<Math.PI*2:h=>h>0;for(let h=u;d(h);h+=l){const p=v.fromValues(0,0,t),f=v.fromValues(i*Math.cos(h),i*Math.sin(h),t),m=v.fromValues(i*Math.cos(h+l),i*Math.sin(h+l),t);c.push(p),c.push(f),c.push(m),r==="up"?a.push(n,n,n):a.push(s,s,s)}return[c,a]},Je=(e,t,r)=>{const o=[],i=[],n=[],s=Math.PI/e,a=v.fromValues(0,0,t),c=v.fromValues(0,0,r),u=w.fromValues(0,0,1);for(let l=0;l<Math.PI*2;l+=s){const d=v.fromValues(.5*Math.cos(l),.5*Math.sin(l),t),h=w.fromPoints(d,a);o.push(d),i.push(h),n.push(w.fromVector(h.crossProduct(u)));const p=v.fromValues(.5*Math.cos(l+s),.5*Math.sin(l+s),t),f=w.fromPoints(p,a);o.push(p),i.push(f),n.push(w.fromVector(f.crossProduct(u)));const m=v.fromValues(.5*Math.cos(l),.5*Math.sin(l),r),g=w.fromPoints(m,c);o.push(m),i.push(g),n.push(w.fromVector(g.crossProduct(u)));const V=v.fromValues(.5*Math.cos(l),.5*Math.sin(l),r),_=w.fromPoints(V,c);o.push(V),i.push(_),n.push(w.fromVector(_.crossProduct(u)));const y=v.fromValues(.5*Math.cos(l+s),.5*Math.sin(l+s),t),b=w.fromPoints(y,a);o.push(y),i.push(b),n.push(w.fromVector(b.crossProduct(u)));const x=v.fromValues(.5*Math.cos(l+s),.5*Math.sin(l+s),r),M=w.fromPoints(x,c);o.push(x),i.push(M),n.push(w.fromVector(M.crossProduct(u)))}return[o,i,n]},bt=e=>{let t=Math.asin(e.z);return[(Math.atan2(e.y,e.x)+Math.PI)/(2*Math.PI),.5-t/Math.PI]},Mt=e=>[(Math.atan2(e.y,e.x)+Math.PI)/(2*Math.PI),e.z+.5],Qt=(e,t,r)=>{const o=Math.min(e[0],t[0],r[0]),i=Math.max(e[0],t[0],r[0]);Math.abs(i-o)>.8&&(e[0]<.4&&t[0]<.4?r[0]-=1:e[0]<.4&&r[0]<.4?t[0]-=1:t[0]<.4&&r[0]<.4?e[0]-=1:e[0]>.6&&t[0]>.6?r[0]+=1:e[0]>.6&&r[0]>.6?t[0]+=1:t[0]>.6&&r[0]>.6&&(e[0]+=1))},tr=()=>{const e=[],t=[],r=[];e.push(v.fromValues(-1,-1,0)),e.push(v.fromValues(1,-1,0)),e.push(v.fromValues(-1,1,0)),e.push(v.fromValues(-1,1,0)),e.push(v.fromValues(1,-1,0)),e.push(v.fromValues(1,1,0));const o=w.fromValues(0,0,1),i=w.fromValues(1,0,0);for(let n=0;n<6;n++)t.push(o),r.push(i);return[e,t,r]},er=(e,t)=>{const{id:r,textureCoordinates:o}=t,i=T.rotationX(G(-90)),n=T.rotationX(G(180)),s=T.rotationX(G(90)),a=T.rotationZ(G(-90)).rotationY(G(90)),c=T.rotationZ(G(90)).rotationY(G(-90)),u=Lt.from2Vectors(v.fromValues(0,0,.5),w.fromValues(0,0,1),w.fromValues(1,0,0)),l=u.map(n),d=u.map(i),h=u.map(s),p=u.map(a),f=u.map(c),m={w:.25,h:.25},g=st(u,{w:1,h:1},{pos:{u:.25+.25/2,v:.25/2},size:m}),V=st(l,{w:1,h:1},{pos:{u:.25+.25/2,v:.5+.25/2},size:m}),_=st(d,{w:1,h:1},{pos:{u:.25+.25/2,v:.25+.25/2},size:m}),y=st(h,{w:1,h:1},{pos:{u:.75+.25/2,v:.25+.25/2},size:m}),b=st(p,{w:1,h:1},{pos:{u:0+.25/2,v:.25+.25/2},size:m}),x=st(f,{w:1,h:1},{pos:{u:.5+.25/2,v:.25+.25/2},size:m}),[M,C,A,F]=at(g,e),U=at(V,e),R=at(_,e),k=at(y,e),Z=at(b,e),L=at(x,e);M.push(...U[0],...R[0],...k[0],...Z[0],...L[0]),C.push(...U[1],...R[1],...k[1],...Z[1],...L[1]),A.push(...U[2],...R[2],...k[2],...Z[2],...L[2]),F.push(...U[3],...R[3],...k[3],...Z[3],...L[3]);const it=new nt(r,"triangle-list",t);return it.addVertices(new Float32Array(M)),it.addNormals(new Float32Array(C)),it.addTangents(new Float32Array(A)),o&&it.addTextures(new Float32Array(F)),it},rr=()=>er,or=(e,t)=>{const{steps:r,id:o,textureCoordinates:i}=t,n=e.transpose().invert(),s=[],a=[],c=[],u=[],[l,d]=xt(r,.5,"up"),[h,p]=xt(r,-.5,"down"),[f,m,g]=Je(r,-.5,.5);if(s.push(...l.map(_=>_.map(e))),s.push(...h.map(_=>_.map(e))),s.push(...f.map(_=>_.map(e))),i){let _=0,y=0;const b=l.map(C=>[C.x+.5,C.y+.5]),x=h.map(C=>[C.x+.5,C.y+.5]),M=f.map(C=>{const A=C.z+.5;let F=(Math.atan2(C.y,C.x)+Math.PI)/(2*Math.PI);return F<Math.min(_,y)&&(F+=1),y=_,_=F,[F,A]});u.push(...b),u.push(...x),u.push(...M)}a.push(...d.map(_=>_.map(n))),a.push(...p.map(_=>_.map(n))),a.push(...m.map(_=>_.map(n))),c.push(...l.map(_=>w.fromValues(1,0,0).map(n))),c.push(...h.map(_=>w.fromValues(-1,0,0).map(n))),c.push(...g.map(_=>_.map(n)));const V=new nt(o,"triangle-list",t);return V.addVertices(new Float32Array(s.map(_=>_.triplet).flat())),V.addNormals(new Float32Array(a.map(_=>_.triplet).flat())),V.addTangents(new Float32Array(c.map(_=>_.triplet).flat())),i&&V.addTextures(new Float32Array(u.flat())),V},ir=()=>or,O=.5257311121191336,q=.8506508083520399,nr=[w.fromValues(-O,0,q),w.fromValues(O,0,q),w.fromValues(-O,0,-q),w.fromValues(O,0,-q),w.fromValues(0,q,O),w.fromValues(0,q,-O),w.fromValues(0,-q,O),w.fromValues(0,-q,-O),w.fromValues(q,O,0),w.fromValues(-q,O,0),w.fromValues(q,-O,0),w.fromValues(-q,-O,0)],sr=[[0,4,1],[0,9,4],[9,5,4],[4,5,8],[4,8,1],[8,10,1],[8,3,10],[5,3,8],[5,2,3],[2,7,3],[7,10,3],[7,6,10],[7,11,6],[11,0,6],[0,1,6],[6,1,10],[9,0,11],[9,11,2],[9,2,5],[7,2,11]];function ar(e,t){return w.fromVector(e.add(t))}function Kt(e,t,r=1){const o=new Map,i=[];function n(s,a){const c=s<a,u=`${c?s:a}-${c?a:s}`,l=o.get(u);if(l)return l;const d=ar(S.fromValues(...e[s].triplet),S.fromValues(...e[a].triplet));e.push(d);const h=e.length-1;return o.set(u,h),h}for(const[s,a,c]of t){const u=n(s,a),l=n(s,c),d=n(a,c);i.push([s,u,l]),i.push([a,d,u]),i.push([c,l,d]),i.push([u,d,l])}return r===1?[e,i]:Kt(e,i,r-1)}const cr=(e,t)=>{const{steps:r,id:o,textureCoordinates:i}=t,n=e.transpose().invert(),s=w.fromValues(0,0,1),[a,c]=Kt(nr,sr,r),u=[],l=[],d=[],h=[],p=v.fromValues(0,0,0);c.forEach(m=>{const g=v.fromVector(a[m[2]]),V=v.fromVector(a[m[1]]),_=v.fromVector(a[m[0]]),y=w.fromVector(S.fromPoints(g,p)),b=w.fromVector(S.fromPoints(V,p)),x=w.fromVector(S.fromPoints(_,p));if(u.push(...g.map(e).triplet),u.push(...V.map(e).triplet),u.push(..._.map(e).triplet),l.push(...y.map(n).triplet),l.push(...b.map(n).triplet),l.push(...x.map(n).triplet),d.push(...w.fromVector(y.crossProduct(s)).triplet),d.push(...w.fromVector(b.crossProduct(s)).triplet),d.push(...w.fromVector(x.crossProduct(s)).triplet),i){const M=bt(y),C=bt(b),A=bt(x);Qt(M,C,A),h.push(...M),h.push(...C),h.push(...A)}});const f=new nt(o,"triangle-list",t);return f.addVertices(new Float32Array(u)),f.addNormals(new Float32Array(l)),f.addTangents(new Float32Array(d)),i&&f.addTextures(new Float32Array(h)),f},Bt=()=>cr,lr=(e,t)=>{const{steps:r,id:o}=t,i=e.transpose().invert(),n=e.scaleVector,s=Math.min(n.x,n.y)/r,a=Math.floor(n.x/s),c=Math.floor(n.y/s),u=1/a,l=1/c,d=[];for(let h=0;h<a;h++){d.push([]);for(let p=0;p<c+1;p++)d[h].push(v.fromValues(-.5+u*h,-.5+l*p,0)),d[h].push(v.fromValues(-.5+u*(h+1),-.5+l*p,0))}return d.map(h=>{const p=Qe("triangle-strip",h);return[new Float32Array(h.map(f=>f.map(e).triplet).flat()),new Float32Array(p.map(f=>f.map(i).triplet).flat()),new Float32Array(h.map(f=>w.fromValues(1,0,0).map(i).triplet).flat()),new Float32Array(h.map(f=>[f.x+.5,f.y+.5]).flat())]}).reduce((h,[p,f,m,g])=>(h.addVertices(p),h.addNormals(f),h.addTangents(m),h.addTextures(g),h),new nt(o,"triangle-strip",t)).setCullMode("none")},ur=()=>lr,hr=(e,t)=>{const{steps:r,id:o,height:i,textureCoordinates:n}=t,s=e.transpose().invert();let a=[];const c=[],u=[],l=[],d=Math.atan(1/.5),h=(1-Math.min(1,i))/Math.sin(d)*Math.cos(d),[p,f]=xt(r,-.5,"down"),[m,g,V]=Ke(r,-.5,i),[_,y]=xt(r,-.5+i,"up",h);if(a.push(..._),a.push(...p),a.push(...m),n){l.push(..._.map(M=>[M.x+.5,M.y+.5])),l.push(...p.map(M=>[M.x+.5,M.y+.5]));const x=m.length/3;for(let M=0;M<x;M++){const C=Mt(m[M*3+0]),A=Mt(m[M*3+1]),F=Mt(m[M*3+2]);Qt(C,A,F),l.push(C),l.push(A),l.push(F)}}a=a.map(x=>x.map(e)),c.push(...y.map(x=>x.map(s))),c.push(...f.map(x=>x.map(s))),c.push(...g.map(x=>x.map(s))),u.push(..._.map(x=>w.fromValues(1,0,0).map(s))),u.push(...p.map(x=>w.fromValues(-1,0,0).map(s))),u.push(...V.map(x=>x.map(s)));const b=new nt(o,"triangle-list",t);return b.addVertices(new Float32Array(a.map(x=>x.triplet).flat())),b.addNormals(new Float32Array(c.map(x=>x.triplet).flat())),b.addTangents(new Float32Array(u.map(x=>x.triplet).flat())),n&&b.addTextures(new Float32Array(l.flat())),b},dr=()=>hr;class pr extends nt{get vertexShader(){return"vertexEnvironmentShader"}get fragmentShader(){return"fragmentEnvironmentShader"}}const fr=(e,t)=>{const{id:r}=t,[o,i,n]=tr(),s=o.map(l=>l.map(e).triplet).flat(),a=i.map(l=>l.triplet).flat(),c=n.map(l=>l.triplet).flat(),u=new pr(r,"triangle-list",t);return u.addVertices(new Float32Array(s)),u.addNormals(new Float32Array(a)),u.addTangents(new Float32Array(c)),u.setCullMode("none"),u},mr=()=>fr,vr=(e,t)=>{const{id:r,colors:o,showAxes:i}=t,n=e.scaleVector,s=Math.min(n.x,n.y),a=Math.log10(s),c=Math.max(.6-(a-Math.floor(a)),0),u=Math.min(1,c+.2),l=Math.max(.15,c-.3),d=Math.floor(a)-1,h=Math.floor(a),p=Math.floor(a)-2,f=Math.pow(10,d),m=Math.pow(10,h),g=Math.pow(10,p)*2;console.log("prev tileDim",g,"with total grids",s/g," with alpha",l),console.log("main tileDim",f,"with total grids",s/f," with alpha",c),console.log("next tileDim",m,"with total grids",s/m," with alpha",u);const V=Vt(n,f,e,!i),_=Vt(n,m,e,!i),y=new nt(r,"line-list",t);if(i){const b=[],x=v.fromValues(-0,0,0).map(e),M=v.fromValues(.5,0,0).map(e),C=v.fromValues(0,-0,0).map(e),A=v.fromValues(0,.5,0).map(e),F=v.fromValues(0,0,0).map(e),U=v.fromValues(0,0,f),R=v.fromValues(-.5,0,0).map(e),k=v.fromValues(0,0,0).map(e),Z=v.fromValues(-0,-.5,0).map(e),L=v.fromValues(0,0,0).map(e);b.push(x,M,C,A,F,U,R,k,Z,L);const it=[[1,0,0,1],[1,0,0,1],[0,1,0,1],[0,1,0,1],[.1,.1,1,1],[.1,.1,1,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1]];y.addVertices(new Float32Array(b.flatMap(ee=>ee.triplet))),y.addColors(new Float32Array(it.flat()))}if(y.addVertices(new Float32Array(_.flatMap(b=>b.triplet))),y.addColors(new Float32Array(Tt(_,u,o==null?void 0:o[0]))),y.addVertices(new Float32Array(V.flatMap(b=>b.triplet))),y.addColors(new Float32Array(Tt(V,c,o==null?void 0:o[1]))),s/g<100){const b=Vt(n,g,e,!i);y.addVertices(new Float32Array(b.flatMap(x=>x.triplet))),y.addColors(new Float32Array(Tt(b,l,o==null?void 0:o[2])))}return y},gr=()=>vr,Vt=(e,t,r,o=!0)=>{const i=e.x/t,n=e.y/t,s=1/i,a=1/n,c=-.05,u=[];if(o){const l=v.fromValues(0,-.5,c).map(r),d=v.fromValues(0,.5,c).map(r);u.push(l,d)}for(let l=1;l<i/2;l++){const d=v.fromValues(-s*l,-.5,c).map(r),h=v.fromValues(-s*l,.5,c).map(r);if(u.push(d,h),s*l<.5){const p=v.fromValues(s*l,-.5,c).map(r),f=v.fromValues(s*l,.5,c).map(r);u.push(p,f)}}if(o){const l=v.fromValues(-.5,0,c).map(r),d=v.fromValues(.5,0,c).map(r);u.push(l,d)}for(let l=1;l<n/2;l++){const d=v.fromValues(-.5,-a*l,c).map(r),h=v.fromValues(.5,-a*l,c).map(r);if(u.push(d,h),a*l<.5){const p=v.fromValues(-.5,a*l,c).map(r),f=v.fromValues(.5,a*l,c).map(r);u.push(p,f)}}return u};function Tt(e,t,r){return e.flatMap(()=>r??[.5,.5,.5,t])}const _r=(e,t=[10,10,10],r=Math.PI/5)=>{let o=v.fromValues(0,0,0),i=v.fromValues(...t),n=i.x===0&&i.y===0?w.fromValues(0,1,0):w.fromValues(0,0,1),s=[0,0],a=[0,0],c=0,u=0,l=r,d=S.fromPoints(i,o).lengthSquare,h=Lt.lookAt(i,o,n),p=!1;return[{move:(f,m,g)=>{const V=Math.min(e.canvas.width,e.canvas.height),_=Math.max(e.canvas.width,e.canvas.height);let y=Math.log(d)*Math.atan(l)/(_/2),b=l/V*2;switch(f){case"mouse-0":s=[m.direction[0]*y,m.direction[1]*y],p=!0;break;case"mouse-1":a=[-m.direction[0]*b,m.direction[1]*b];break;case"mouse-2":l+=m.direction[1]*b;break;case"none":p=!1;break}},zoom:f=>{const m=Math.log(d+1)/(4e3*Math.atan(l));c=f*m},tilt:f=>{u=f*5e-4,p=!1}},{view:f=>{if(!f||f!=null&&f.isIdentity)return T.lookAt(i,o,n);const m=S.fromPoints(i,o).scale(1-c);m.length>2&&m.length<500&&(i=o.add(m));const g=S.fromPoints(o,i),V=T.move(g).apply(h),_=[Math.tan(a[0])*d,Math.tan(a[1])*d],y=S.fromValues(_[0],_[1],0).absolute(V),b=V.relative(i);let x=V.relative(n);x=T.rotationZ(u).apply(x);const M=T.rotationX(-s[1]).compose(T.rotationY(-s[0]));i=M.apply(b).absolute(V),n=M.apply(x).absolute(V);const C=T.move(y);return o=C.apply(o),i=C.apply(i),h=Lt.lookAt(i,o,n),p||(s=[s[0]*.95,s[1]*.95],u*=.9,c*=.9,Math.abs(s[0])<.001&&Math.abs(s[1])<.001&&Math.abs(u)<.001&&Math.abs(c)<.001&&(s=[0,0],u=0,c=0)),a=[0,0],d=S.fromPoints(i,o).length,h.toTransform()},projection:f=>{const m=e.canvas.width/e.canvas.height,g=S.fromPoints(i,o).length,V=Math.max(400,g*.8);return T.perspective(l,m,Math.max(.01,g-V),g+V)}}]},Jt=(e,t)=>{const r=-G(3),o=-G(180/40),i=v.fromValues(30,0,0),n=v.fromValues(-8,0,-1);e.setAmbientLight([.02,.01,.01,.01]);const s=w.fromVector(v.origin().subtract(i)),a=w.fromVector(v.origin().subtract(n));switch(e.setLight("directional",0,{dir:s,col:[.55,.55,.5,0]}),e.setLight("directional",1,{dir:a,col:[.6,.6,.6,0]}),e.setLight("point",0,{pos:i,col:[.8,.8,.7,0]}),e.setLight("point",1,{pos:n,col:[.18,.18,.4,0]}),e.setLight("point",2,{pos:n,col:[.1,.1,.4,0]}),e.setLight("point",3,{pos:n,col:[.1,.1,.4,0]}),t){case"globe":e.setLight("directional",0,{dir:s,col:[.6,.6,.6,.6]}),e.setLight("directional",1,{dir:a,col:[.18,.18,.4,.2]}),e.setLight("point",0,{pos:i,col:[.8,.8,.7,1]}),e.setLight("point",1,{pos:n,col:[.18,.18,.4,.8]});break;case"cylinder":e.setAmbientLight([.1,.1,.1,.01]),e.setLight("point",0,{pos:v.fromValues(20,0,0),col:[.8,.5,.5,1]}),e.setLight("point",1,{pos:v.fromValues(-20,0,0),col:[.4,.6,.8,1]}),e.setLight("point",2,{pos:v.fromValues(10,10,0),col:[.5,.5,.5,.3]});break;case"cube":e.setAmbientLight([.15,.15,.15,.1]),e.setLight("point",0,{pos:v.fromValues(5,0,0),col:[.7,.7,.7,1]});break;case"cone":e.setAmbientLight([.5,.5,.5,.1]),e.setLight("point",0,{pos:v.fromValues(10,0,0),col:[.4,.8,.4,.6]}),e.setLight("point",1,{pos:v.fromValues(-10,10,0),col:[.8,.4,.4,.6]});break;case"plane":e.setAmbientLight([.5,.5,.5,.1]),e.setLight("directional",0,{dir:w.fromValues(0,-1,0),col:[1,1,1,1]}),e.setLight("directional",1,{dir:w.fromValues(0,1,0),col:[1,1,1,1]}),e.setLight("point",0,{pos:v.fromValues(10,0,0),col:[.4,.8,.4,.6]}),e.setLight("point",1,{pos:v.fromValues(-10,10,0),col:[.8,.4,.4,.6]});break}return console.log("Lights initialized:",t),{dirLights:(c,u)=>{const l=c/1e3,d=T.rotationZ(r*l);u[0].dir=u[0].dir.map(d);const h=T.rotationZ(o*l);u[1].dir=u[0].dir.map(h)},posLights:(c,u)=>{const l=c/1e3,d=T.rotationZ(r*l),h=T.rotationZ(o*l);u[0].pos=u[0].pos.map(d),u[1].pos=u[1].pos.map(h)}}};let E=0,Nt=0;const xr=e=>({plane:t=>{const r=t/1e3;return E+=r*G(360/40),{rotation:tt.rotationZ(E).rotateY(E/2)}},cone:t=>{const r=t/1e3;return E+=r*G(360/10),{rotation:tt.rotationX(E).rotateY(E/2).rotateZ(E/3)}},"earth-clouds":t=>{const r=t/2e3;return Nt-=r*.08,{rotation:tt.rotationY(G(-12.4)).rotateZ(Nt)}},"earth-sphere":t=>{const r=t/2e3;return E-=r*.1,{rotation:tt.rotationY(G(-12.4)).rotateZ(E)}},cylinder:t=>{const r=t/1e3;return E+=r*G(360/20),{rotation:tt.rotationZ(E).rotateY(E)}},cube:t=>{const r=t/1e3;return E+=r*G(360/10),{rotation:tt.rotationZ(E).rotateY(E).rotateZ(E)}}}),j={textures:[],globeTextures:[],environmentTexture:null,showGrid:!1},yr=e=>{const t=Bt()(T.scale(2.5,2.5,2.48),{id:"earth-sphere",steps:5,colors:[[.3,.4,.7,1]],textureCoordinates:!0,alpha:.8,bumpIntensity:.002,bumpPrecision:4});t.addMaterial(e[0]),t.addMaterial(e[1]);const r=Bt()(T.scale(2.52,2.52,2.52),{id:"earth-clouds",steps:4,colors:[[1,1,1,0]],textureCoordinates:!0,alpha:1,bumpIntensity:.004,bumpPrecision:8});return r.addMaterial(e[2]),r.addMaterial(e[2]),[t,r]},wr=e=>{const t=ir()(T.scale(3,3,4),{id:"cylinder",steps:36,colors:[[.6,.6,.5,1]],textureCoordinates:!0,alpha:.8,bumpIntensity:.02,bumpPrecision:6});return t.addMaterial(e[0]),t.addMaterial(e[0]),[t]},br=e=>{const t=rr()(T.scale(2,2,2),{id:"cube",textureCoordinates:!0,alpha:1,bumpIntensity:0});return t.addMaterial(e[1]),[t]},Mr=e=>{const t=dr()(T.scale(3,3,4).translation(0,0,1),{id:"cone",steps:48,height:.8,textureCoordinates:!0,colors:[[.58,.83,.56,1]],alpha:.8,bumpIntensity:.01,bumpPrecision:6});return t.addMaterial(e[3]),t.addMaterial(e[3]),[t]},Vr=e=>{const t=ur()(T.scale(4,4,1).rotationY(G(75)),{id:"plane",steps:12,textureCoordinates:!0,colors:[[.4,.4,.4,1]],alpha:1,bumpIntensity:.05,bumpPrecision:12});return t.addMaterial(e[2]),t.addMaterial(e[2]),[t]},Tr=()=>[gr()(T.scale(180,180,1).translation(0,0,0),{id:"ref-plane",colors:[[.2,.2,.3,.4]],showAxes:!0})],te=()=>[mr()(T.identity(),{id:"environment-background",colors:[[1,1,1,1]]})];async function Pr(e,t){const r=await je(e);await r.setupShaders("standard-3d");const[o,i]=_r(r,[4,4,2],Math.PI/2.5);r.captureMouseMotion(o);const n=xr(),s=Jt(r,"none");r.beginRenderLoop({camera:i,lights:s,models:n});const a=[...Tr(),...te()];return r.setScene(a.filter(c=>c.id!=="environment-background")),r}const ht=(e,t)=>()=>{e.getScene().forEach(o=>o.display="none"),e.get("ref-plane")[0].display=j.showGrid?"full":"none",e.get("environment-background").forEach(o=>o.display="full");const r=Jt(e,t);switch(e.setLightsHandler(r),t){case"plane":{const o=e.get("plane");if(o.length>0)o.forEach(i=>i.display="full");else{const i=Vr(j.textures);e.addToScene(i)}break}case"globe":{const o=e.get("earth-sphere","earth-clouds");if(o.length>0)o.forEach(i=>i.display="full");else{const i=yr(j.globeTextures);e.addToScene(i)}break}case"cylinder":{const o=e.get("cylinder");if(o.length>0)o.forEach(i=>i.display="full");else{const i=wr(j.textures);e.addToScene(i)}break}case"cone":{const o=e.get("cone");if(o.length>0)o.forEach(i=>i.display="full");else{const i=Mr(j.textures);e.addToScene(i)}break}case"cube":{const o=e.get("cube");if(o.length>0)o.forEach(i=>i.display="full");else{const i=br(j.textures);e.addToScene(i)}break}}},Sr=(e,t)=>()=>{console.log("setWireframe",t.checked),t.checked?e.setPipelineMode("alternative"):e.setPipelineMode("default")},Cr=(e,t)=>()=>{console.log("setGrid",t.checked),j.showGrid=t.checked,e.get("ref-plane")[0].display=j.showGrid?"full":"none"},X=document.getElementById("support"),Ut=document.getElementById("gfx-canvas"),dt=document.getElementById("fps");!X||!Ut?alert("The app is broken! No canvas was found!"):Pr(Ut).then(e=>(X.innerText="Loading environment...",Wt(e,"env-space-4k.png"))).then(([e,t])=>(j.environmentTexture=t,e.setEnvironmentMaterial(t),e.addToScene(te()),X.innerText="Loading textures...",Et(e,["earth4k.jpg","earth4k-bump.jpg","earth-clouds.png"]))).then(([e,t])=>(j.globeTextures.push(...t),X.innerText="Almost there...",e)).then(e=>Et(e,["wood-2k.jpg","dice.png","water.jpg","metal.jpg"])).then(([e,t])=>{j.textures.push(...t);const r=document.getElementById("wireframe");r.onclick=Sr(e,r);const o=document.getElementById("grid");o.onclick=Cr(e,o);const i=document.getElementById("geo-globe"),n=document.getElementById("geo-cylinder"),s=document.getElementById("geo-cube"),a=document.getElementById("geo-cone"),c=document.getElementById("geo-plane");i.onclick=ht(e,"globe"),n.onclick=ht(e,"cylinder"),s.onclick=ht(e,"cube"),a.onclick=ht(e,"cone"),c.onclick=ht(e,"plane"),setTimeout(()=>{i.click()},100),X.innerText="All set!",X.style.opacity="0",dt&&(dt.style.opacity="1",dt.style.width="160px"),setInterval(()=>{X&&(X.style.display="none"),dt&&(dt.innerText=`FPS: ${e.fps.toFixed(0)}`)},2e3)}).catch(e=>{X&&(X.innerText="Error: "+e.message)});
