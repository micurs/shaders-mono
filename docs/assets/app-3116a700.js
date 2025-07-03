(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var Qt=Object.defineProperty,Jt=(e,t,r)=>t in e?Qt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,D=(e,t,r)=>(Jt(e,typeof t!="symbol"?t+"":t,r),r),ft=1e-6,U=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});function Et(){var e=new U(9);return U!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function te(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e}function Q(){var e=new U(16);return U!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function X(e){var t=new U(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function ee(e,t,r,o,i,s,n,a,c,u,l,f,h,d,p,v){var m=new U(16);return m[0]=e,m[1]=t,m[2]=r,m[3]=o,m[4]=i,m[5]=s,m[6]=n,m[7]=a,m[8]=c,m[9]=u,m[10]=l,m[11]=f,m[12]=h,m[13]=d,m[14]=p,m[15]=v,m}function Vt(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function re(e,t){if(e===t){var r=t[1],o=t[2],i=t[3],s=t[6],n=t[7],a=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=r,e[6]=t[9],e[7]=t[13],e[8]=o,e[9]=s,e[11]=t[14],e[12]=i,e[13]=n,e[14]=a}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e}function A(e,t){var r=t[0],o=t[1],i=t[2],s=t[3],n=t[4],a=t[5],c=t[6],u=t[7],l=t[8],f=t[9],h=t[10],d=t[11],p=t[12],v=t[13],m=t[14],V=t[15],_=r*a-o*n,x=r*c-i*n,w=r*u-s*n,y=o*c-i*a,b=o*u-s*a,P=i*u-s*c,F=l*v-f*p,G=l*m-h*p,E=l*V-d*p,R=f*m-h*v,Z=f*V-d*v,k=h*V-d*m,L=_*k-x*Z+w*R+y*E-b*G+P*F;return L?(L=1/L,e[0]=(a*k-c*Z+u*R)*L,e[1]=(i*Z-o*k-s*R)*L,e[2]=(v*P-m*b+V*y)*L,e[3]=(h*b-f*P-d*y)*L,e[4]=(c*E-n*k-u*G)*L,e[5]=(r*k-i*E+s*G)*L,e[6]=(m*w-p*P-V*x)*L,e[7]=(l*P-h*w+d*x)*L,e[8]=(n*Z-a*E+u*F)*L,e[9]=(o*E-r*Z-s*F)*L,e[10]=(p*b-v*w+V*_)*L,e[11]=(f*w-l*b-d*_)*L,e[12]=(a*G-n*R-c*F)*L,e[13]=(r*R-o*G+i*F)*L,e[14]=(v*x-p*y-m*_)*L,e[15]=(l*y-f*x+h*_)*L,e):null}function mt(e,t,r){var o=t[0],i=t[1],s=t[2],n=t[3],a=t[4],c=t[5],u=t[6],l=t[7],f=t[8],h=t[9],d=t[10],p=t[11],v=t[12],m=t[13],V=t[14],_=t[15],x=r[0],w=r[1],y=r[2],b=r[3];return e[0]=x*o+w*a+y*f+b*v,e[1]=x*i+w*c+y*h+b*m,e[2]=x*s+w*u+y*d+b*V,e[3]=x*n+w*l+y*p+b*_,x=r[4],w=r[5],y=r[6],b=r[7],e[4]=x*o+w*a+y*f+b*v,e[5]=x*i+w*c+y*h+b*m,e[6]=x*s+w*u+y*d+b*V,e[7]=x*n+w*l+y*p+b*_,x=r[8],w=r[9],y=r[10],b=r[11],e[8]=x*o+w*a+y*f+b*v,e[9]=x*i+w*c+y*h+b*m,e[10]=x*s+w*u+y*d+b*V,e[11]=x*n+w*l+y*p+b*_,x=r[12],w=r[13],y=r[14],b=r[15],e[12]=x*o+w*a+y*f+b*v,e[13]=x*i+w*c+y*h+b*m,e[14]=x*s+w*u+y*d+b*V,e[15]=x*n+w*l+y*p+b*_,e}function nt(e,t,r){var o=r[0],i=r[1],s=r[2],n,a,c,u,l,f,h,d,p,v,m,V;return t===e?(e[12]=t[0]*o+t[4]*i+t[8]*s+t[12],e[13]=t[1]*o+t[5]*i+t[9]*s+t[13],e[14]=t[2]*o+t[6]*i+t[10]*s+t[14],e[15]=t[3]*o+t[7]*i+t[11]*s+t[15]):(n=t[0],a=t[1],c=t[2],u=t[3],l=t[4],f=t[5],h=t[6],d=t[7],p=t[8],v=t[9],m=t[10],V=t[11],e[0]=n,e[1]=a,e[2]=c,e[3]=u,e[4]=l,e[5]=f,e[6]=h,e[7]=d,e[8]=p,e[9]=v,e[10]=m,e[11]=V,e[12]=n*o+l*i+p*s+t[12],e[13]=a*o+f*i+v*s+t[13],e[14]=c*o+h*i+m*s+t[14],e[15]=u*o+d*i+V*s+t[15]),e}function oe(e,t,r){var o=r[0],i=r[1],s=r[2];return e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e[3]=t[3]*o,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*s,e[9]=t[9]*s,e[10]=t[10]*s,e[11]=t[11]*s,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function Rt(e,t,r){var o=Math.sin(r),i=Math.cos(r),s=t[4],n=t[5],a=t[6],c=t[7],u=t[8],l=t[9],f=t[10],h=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=s*i+u*o,e[5]=n*i+l*o,e[6]=a*i+f*o,e[7]=c*i+h*o,e[8]=u*i-s*o,e[9]=l*i-n*o,e[10]=f*i-a*o,e[11]=h*i-c*o,e}function Zt(e,t,r){var o=Math.sin(r),i=Math.cos(r),s=t[0],n=t[1],a=t[2],c=t[3],u=t[8],l=t[9],f=t[10],h=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*i-u*o,e[1]=n*i-l*o,e[2]=a*i-f*o,e[3]=c*i-h*o,e[8]=s*o+u*i,e[9]=n*o+l*i,e[10]=a*o+f*i,e[11]=c*o+h*i,e}function kt(e,t,r){var o=Math.sin(r),i=Math.cos(r),s=t[0],n=t[1],a=t[2],c=t[3],u=t[4],l=t[5],f=t[6],h=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*i+u*o,e[1]=n*i+l*o,e[2]=a*i+f*o,e[3]=c*i+h*o,e[4]=u*i-s*o,e[5]=l*i-n*o,e[6]=f*i-a*o,e[7]=h*i-c*o,e}function ie(e,t,r){var o=t[0],i=t[1],s=t[2],n=t[3],a=o+o,c=i+i,u=s+s,l=o*a,f=o*c,h=o*u,d=i*c,p=i*u,v=s*u,m=n*a,V=n*c,_=n*u;return e[0]=1-(d+v),e[1]=f+_,e[2]=h-V,e[3]=0,e[4]=f-_,e[5]=1-(l+v),e[6]=p+m,e[7]=0,e[8]=h+V,e[9]=p-m,e[10]=1-(l+d),e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e}function se(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function ne(e,t){var r=t[0],o=t[1],i=t[2],s=t[4],n=t[5],a=t[6],c=t[8],u=t[9],l=t[10];return e[0]=Math.hypot(r,o,i),e[1]=Math.hypot(s,n,a),e[2]=Math.hypot(c,u,l),e}function ae(e,t,r,o){var i=t[0],s=t[1],n=t[2],a=t[3],c=i+i,u=s+s,l=n+n,f=i*c,h=i*u,d=i*l,p=s*u,v=s*l,m=n*l,V=a*c,_=a*u,x=a*l,w=o[0],y=o[1],b=o[2];return e[0]=(1-(p+m))*w,e[1]=(h+x)*w,e[2]=(d-_)*w,e[3]=0,e[4]=(h-x)*y,e[5]=(1-(f+m))*y,e[6]=(v+V)*y,e[7]=0,e[8]=(d+_)*b,e[9]=(v-V)*b,e[10]=(1-(f+p))*b,e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e}function ce(e,t){var r=t[0],o=t[1],i=t[2],s=t[3],n=r+r,a=o+o,c=i+i,u=r*n,l=o*n,f=o*a,h=i*n,d=i*a,p=i*c,v=s*n,m=s*a,V=s*c;return e[0]=1-f-p,e[1]=l+V,e[2]=h-m,e[3]=0,e[4]=l-V,e[5]=1-u-p,e[6]=d+v,e[7]=0,e[8]=h+m,e[9]=d-v,e[10]=1-u-f,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function le(e,t,r,o,i){var s=1/Math.tan(t/2),n;return e[0]=s/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0?(n=1/(o-i),e[10]=(i+o)*n,e[14]=2*i*o*n):(e[10]=-1,e[14]=-2*o),e}var ue=le;function Ot(e,t,r,o){var i,s,n,a,c,u,l,f,h,d,p=t[0],v=t[1],m=t[2],V=o[0],_=o[1],x=o[2],w=r[0],y=r[1],b=r[2];return Math.abs(p-w)<ft&&Math.abs(v-y)<ft&&Math.abs(m-b)<ft?Vt(e):(l=p-w,f=v-y,h=m-b,d=1/Math.hypot(l,f,h),l*=d,f*=d,h*=d,i=_*h-x*f,s=x*l-V*h,n=V*f-_*l,d=Math.hypot(i,s,n),d?(d=1/d,i*=d,s*=d,n*=d):(i=0,s=0,n=0),a=f*n-h*s,c=h*i-l*n,u=l*s-f*i,d=Math.hypot(a,c,u),d?(d=1/d,a*=d,c*=d,u*=d):(a=0,c=0,u=0),e[0]=i,e[1]=a,e[2]=l,e[3]=0,e[4]=s,e[5]=c,e[6]=f,e[7]=0,e[8]=n,e[9]=u,e[10]=h,e[11]=0,e[12]=-(i*p+s*v+n*m),e[13]=-(a*p+c*v+u*m),e[14]=-(l*p+f*v+h*m),e[15]=1,e)}function et(){var e=new U(3);return U!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function he(e){var t=e[0],r=e[1],o=e[2];return Math.hypot(t,r,o)}function ht(e,t,r){var o=new U(3);return o[0]=e,o[1]=t,o[2]=r,o}function de(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e}function fe(e,t){var r=t[0],o=t[1],i=t[2],s=r*r+o*o+i*i;return s>0&&(s=1/Math.sqrt(s)),e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s,e}function Pt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function at(e,t,r){var o=t[0],i=t[1],s=t[2],n=r[0],a=r[1],c=r[2];return e[0]=i*c-s*a,e[1]=s*n-o*c,e[2]=o*a-i*n,e}var pe=he;(function(){var e=et();return function(t,r,o,i,s,n){var a,c;for(r||(r=3),o||(o=0),i?c=Math.min(i*r+o,t.length):c=t.length,a=o;a<c;a+=r)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],s(e,e,n),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2];return t}})();function qt(){var e=new U(4);return U!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function me(e){var t=new U(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function B(e,t,r,o){var i=new U(4);return i[0]=e,i[1]=t,i[2]=r,i[3]=o,i}function $t(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e}function Yt(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e}function ve(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e[3]=t[3]*r[3],e}function ge(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e}function _e(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e}function tt(e,t){var r=t[0],o=t[1],i=t[2],s=t[3],n=r*r+o*o+i*i+s*s;return n>0&&(n=1/Math.sqrt(n)),e[0]=r*n,e[1]=o*n,e[2]=i*n,e[3]=s*n,e}function Y(e,t,r){var o=t[0],i=t[1],s=t[2],n=t[3];return e[0]=r[0]*o+r[4]*i+r[8]*s+r[12]*n,e[1]=r[1]*o+r[5]*i+r[9]*s+r[13]*n,e[2]=r[2]*o+r[6]*i+r[10]*s+r[14]*n,e[3]=r[3]*o+r[7]*i+r[11]*s+r[15]*n,e}(function(){var e=qt();return function(t,r,o,i,s,n){var a,c;for(r||(r=4),o||(o=0),i?c=Math.min(i*r+o,t.length):c=t.length,a=o;a<c;a+=r)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],e[3]=t[a+3],s(e,e,n),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2],t[a+3]=e[3];return t}})();function vt(){var e=new U(4);return U!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function xe(e,t,r){r=r*.5;var o=Math.sin(r);return e[0]=o*t[0],e[1]=o*t[1],e[2]=o*t[2],e[3]=Math.cos(r),e}function ye(e,t,r){var o=t[0],i=t[1],s=t[2],n=t[3],a=r[0],c=r[1],u=r[2],l=r[3];return e[0]=o*l+n*a+i*u-s*c,e[1]=i*l+n*c+s*a-o*u,e[2]=s*l+n*u+o*c-i*a,e[3]=n*l-o*a-i*c-s*u,e}function we(e,t,r){r*=.5;var o=t[0],i=t[1],s=t[2],n=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c+n*a,e[1]=i*c+s*a,e[2]=s*c-i*a,e[3]=n*c-o*a,e}function Me(e,t,r){r*=.5;var o=t[0],i=t[1],s=t[2],n=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c-s*a,e[1]=i*c+n*a,e[2]=s*c+o*a,e[3]=n*c-i*a,e}function be(e,t,r){r*=.5;var o=t[0],i=t[1],s=t[2],n=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c+i*a,e[1]=i*c-o*a,e[2]=s*c+n*a,e[3]=n*c-s*a,e}function _t(e,t,r,o){var i=t[0],s=t[1],n=t[2],a=t[3],c=r[0],u=r[1],l=r[2],f=r[3],h,d,p,v,m;return d=i*c+s*u+n*l+a*f,d<0&&(d=-d,c=-c,u=-u,l=-l,f=-f),1-d>ft?(h=Math.acos(d),p=Math.sin(h),v=Math.sin((1-o)*h)/p,m=Math.sin(o*h)/p):(v=1-o,m=o),e[0]=v*i+m*c,e[1]=v*s+m*u,e[2]=v*n+m*l,e[3]=v*a+m*f,e}function J(e,t){var r=t[0],o=t[1],i=t[2],s=t[3],n=r*r+o*o+i*i+s*s,a=n?1/n:0;return e[0]=-r*a,e[1]=-o*a,e[2]=-i*a,e[3]=s*a,e}function Ht(e,t){var r=t[0]+t[4]+t[8],o;if(r>0)o=Math.sqrt(r+1),e[3]=.5*o,o=.5/o,e[0]=(t[5]-t[7])*o,e[1]=(t[6]-t[2])*o,e[2]=(t[1]-t[3])*o;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var s=(i+1)%3,n=(i+2)%3;o=Math.sqrt(t[i*3+i]-t[s*3+s]-t[n*3+n]+1),e[i]=.5*o,o=.5/o,e[3]=(t[s*3+n]-t[n*3+s])*o,e[s]=(t[s*3+i]+t[i*3+s])*o,e[n]=(t[n*3+i]+t[i*3+n])*o}return e}var dt=me,Ve=B,jt=tt;(function(){var e=et(),t=ht(1,0,0),r=ht(0,1,0);return function(o,i,s){var n=Pt(i,s);return n<-.999999?(at(e,t,i),pe(e)<1e-6&&at(e,r,i),fe(e,e),xe(o,e,Math.PI),o):n>.999999?(o[0]=0,o[1]=0,o[2]=0,o[3]=1,o):(at(e,i,s),o[0]=e[0],o[1]=e[1],o[2]=e[2],o[3]=1+n,jt(o,o))}})();(function(){var e=vt(),t=vt();return function(r,o,i,s,n,a){return _t(e,o,n,a),_t(t,i,s,a),_t(r,e,t,2*a*(1-a)),r}})();(function(){var e=Et();return function(t,r,o,i){return e[0]=o[0],e[3]=o[1],e[6]=o[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],jt(t,Ht(t,e))}})();const pt=class ${constructor(){D(this,"_coord"),D(this,"scale",t=>{const r=new $;return ge(r._coord,this._coord,t),r}),D(this,"dot",t=>Pt(this.vec3(),t.vec3())),D(this,"crossProduct",t=>{const r=et();return at(r,this.vec3(),t.vec3()),$.fromVec3(r)}),D(this,"add",t=>{const r=new $;return $t(r._coord,this._coord,t._coord),r}),D(this,"multiply",t=>{const r=new $;return ve(r._coord,this._coord,t._coord),r}),this._coord=B(0,0,0,0)}static get bufferSize(){return 4*4}static fromValues(t,r,o){const i=new $;return i._coord=B(t,r,o,0),i}static fromVec4(t){const r=new $,o=t[3]!==0?t[3]:1;return r._coord=B(t[0]/o,t[1]/o,t[2]/o,0),r}static fromVec3(t){const r=new $;return r._coord=B(t[0],t[1],t[2],0),r}static fromPoints(t,r){const o=new $;return Yt(o._coord,t.vec4(),r.vec4()),o}static fromPoint(t){const r=new $;return r._coord=[...t.triplet,0],r}toString(){return`Vector(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new $;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),r}unMap(t){const r=new $;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}isUnitVector(){return!1}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get triplet(){return[this.x,this.y,this.z]}get coordinates(){return[...this._coord.values()]}buffer(){return new Float32Array(this.coordinates)}get length(){const t=this._coord[0],r=this._coord[1],o=this._coord[2];return Math.sqrt(t*t+r*r+o*o)}get lengthSquare(){const t=this._coord[0],r=this._coord[1],o=this._coord[2];return t*t+r*r+o*o}vec3(){return ht(this.x,this.y,this.z)}vec4(){return B(this.x,this.y,this.z,0)}};D(pt,"crossProduct",(e,t)=>{const r=et();return at(r,e.vec3(),t.vec3()),pt.fromVec3(r)}),D(pt,"dot",(e,t)=>Pt(e.vec3(),t.vec3()));let C=pt;class g{constructor(){D(this,"_coord"),this._coord=B(0,0,0,1)}static get bufferSize(){return 4*4}static origin(){return new g}static fromValues(t,r,o,i=1){const s=new g;return s._coord=B(t/i,r/i,o/i,1),s}static fromVector(t){const r=new g;return r._coord=B(t.x,t.y,t.z,1),r}static fromVec4(t){const r=new g,o=t[3]!==0?t[3]:1;return r._coord=B(t[0]/o,t[1]/o,t[2]/o,1),r}static fromVec3(t){const r=new g;return r._coord=B(t[0],t[1],t[2],1),r}toString(){return`Point(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new g;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),r}unMap(t){const r=new g;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}static relative(t,r){return t.map(r)}static absolute(t,r){return t.unMap(r)}subtract(t){const r=qt();return Yt(r,this._coord,t._coord),C.fromVec4(r)}scale(t){const r=et();return de(r,this.vec3(),t),g.fromVec3(r)}add(t){const r=new g;return $t(r._coord,this._coord,t.vec4()),r}isPoint(){return!0}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get coordinates(){return[...this._coord.values()]}get triplet(){return[this.x,this.y,this.z]}buffer(){return new Float32Array(this.coordinates)}vec3(){return ht(this.x,this.y,this.z)}vec4(){return B(this.x,this.y,this.z,1)}}const Tt=class j{constructor(){D(this,"_coord"),this._coord=B(1,1,1,0)}static get bufferSize(){return 4*4}static fromVector(t){const r=new j;return r._coord=B(t.x,t.y,t.z,0),tt(r._coord,r._coord),r}static fromPoints(t,r){const o=new j;return o._coord=B(t.x-r.x,t.y-r.y,t.z-r.z,0),tt(o._coord,o._coord),o}fromPoint(t){return j.fromValues(...t.triplet)}static fromValues(t,r,o){const i=B(t,r,o,0);return tt(i,i),j.fromVec4(i)}static fromVec4(t){const r=new j,o=t[3]!==0?t[3]:1;return r._coord=B(t[0]/o,t[1]/o,t[2]/o,0),tt(r._coord,r._coord),r}static fromVec3(t){const r=new j;return r._coord=B(t[0],t[1],t[2],0),tt(r._coord,r._coord),r}toString(){return`UnitVector(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new j;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),tt(r._coord,r._coord),r}unMap(t){const r=new j;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),tt(r._coord,r._coord),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}invert(){const t=new j;return _e(t._coord,this._coord),t}scale(t){return C.fromValues(this.x*t,this.y*t,this.z*t)}add(t){return C.fromValues(this.x+t.x,this.y+t.y,this.z+t.z)}isUnitVector(){return!0}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get length(){return 1}get coordinates(){return[...this._coord.values()]}get triplet(){return[this.x,this.y,this.z]}crossProduct(t){return C.fromVec3(this.triplet).crossProduct(t)}buffer(){return new Float32Array(this.coordinates)}vec3(){return ht(this.x,this.y,this.z)}};D(Tt,"crossProduct",(e,t)=>{const r=et();return at(r,e.vec3(),t.vec3()),Tt.fromVec3(r)});let M=Tt;const zt=e=>e.isUnitVector();class T{constructor(){D(this,"_direct"),D(this,"_inverse"),D(this,"_isIdentity",!0),this._direct=Q(),this._inverse=Q(),A(this._inverse,this._direct)}static get bufferSize(){return 16*4}static world(){return new T}static identity(){return new T}static fromRotation(t){const r=new T;return ce(r._direct,t.quat),A(r._inverse,r._direct),r._isIdentity=!1,r}static fromMat4(t){const r=new T,o=Q();return A(o,t),r._direct=X(t),r._inverse=X(o),r._isIdentity=!1,r}static lookAt(t,r,o){const i=new T;return Ot(i._direct,t.vec3(),r.vec3(),o.vec3()),A(i._inverse,i._direct),i._isIdentity=!1,i}static perspective(t,r,o,i){const s=new T;return ue(s._direct,t,r,o,i),A(s._inverse,s._direct),s._isIdentity=!1,s}static invert(t){const r=new T;return r._direct=X(t._inverse),r._inverse=X(t._direct),r._isIdentity=!1,r}static translation(t,r,o){const i=new T;return nt(i._direct,i._direct,[t,r,o]),A(i._inverse,i._direct),i._isIdentity=!1,i}static move(t){const r=new T;return nt(r._direct,r._direct,t.vec3()),A(r._inverse,r._direct),r._isIdentity=!1,r}static rotationX(t){const r=new T;return Rt(r._direct,r._direct,t),A(r._inverse,r._direct),r._isIdentity=!1,r}static rotationY(t){const r=new T;return Zt(r._direct,r._direct,t),A(r._inverse,r._direct),r._isIdentity=!1,r}static rotationZ(t){const r=new T;return kt(r._direct,r._direct,t),A(r._inverse,r._direct),r._isIdentity=!1,r}static scale(t,r,o){const i=new T;return oe(i._direct,i._direct,[t,r,o]),A(i._inverse,i._direct),i._isIdentity=!1,i}static rotoTranslation(t,r){const o=new T;return ie(o._direct,t.quat,r.vec3()),A(o._inverse,o._direct),o._isIdentity=!1,o}static fromRotationTranslationScale(t,r,o){const i=new T;return ae(i._direct,t.quat,r.vec3(),o.vec3()),A(i._inverse,i._direct),i._isIdentity=!1,i}isFrame(){return!1}get values(){return this._direct.values()}get inverseValues(){return this._inverse.values()}buffer(){return new Float32Array(this._direct.values())}inverseBuffer(){return new Float32Array(this._inverse.values())}apply(t){return t.map(this)}compose(t){const r=new T,{_direct:o,_inverse:i}=this,{_direct:s,_inverse:n}=t;return mt(r._direct,s,o),mt(r._inverse,i,n),r._isIdentity=!1,r}transpose(){const t=new T;return re(t._direct,this._direct),A(t._inverse,t._direct),t._isIdentity=!1,t}translation(t,r,o){const i=T.translation(t,r,o);return this.compose(i)}rotationX(t){const r=T.rotationX(t);return this.compose(r)}rotationY(t){const r=T.rotationY(t);return this.compose(r)}rotationZ(t){const r=T.rotationZ(t);return this.compose(r)}scale(t,r,o){const i=T.scale(t,r,o);return this.compose(i)}invert(){const t=new T;return t._direct=X(this._inverse),t._inverse=X(this._direct),t._isIdentity=this._isIdentity,t}get directMatrix(){return this._direct}get inverseMatrix(){return this._inverse}get isIdentity(){return this._isIdentity}get scaleVector(){const t=et();return ne(t,this._direct),C.fromValues(t[0],t[1],t[2])}get positionVector(){const t=et();return se(t,this._direct),C.fromValues(t[0],t[1],t[2])}}const St=class W{constructor(){D(this,"_direct"),D(this,"_inverse"),this._direct=Q(),this._inverse=Q(),Vt(this._direct),Vt(this._inverse)}static bufferSize(){return 16*4}static world(){return new W}static translation(t){const r=new W,o=Q();return nt(o,o,t.vec3()),r._direct=o,A(r._inverse,r._direct),r}static rotationX(t,r){const o=new W,i=Q();return nt(i,i,t.vec3()),Rt(i,i,r),o._direct=i,A(o._inverse,o._direct),o}static rotationY(t,r){const o=new W,i=Q();return nt(i,i,t.vec3()),Zt(i,i,r),o._direct=i,A(o._inverse,o._direct),o}static rotationZ(t,r){const o=new W,i=Q();return nt(i,i,t.vec3()),kt(i,i,r),o._direct=i,A(o._inverse,o._direct),o}static lookAt(t,r,o){const i=new W;return Ot(i._inverse,t.vec3(),r.vec3(),o.vec3()),A(i._direct,i._inverse),i}isFrame(){return!0}toString(){return`Frame(${this.origin}, ${this.i}, ${this.j}, ${this.k})`}map(t){return this.compose(t)}unMap(t){return this.compose(t.invert())}compose(t){const r=new W,{_direct:o}=this,{_direct:i}=t;return mt(r._direct,i,o),A(r._inverse,r._direct),r}toTransform(){return T.fromMat4(this._inverse)}invert(){const t=new W;return t._direct=X(this._inverse),t._inverse=X(this._direct),t}get directMatrix(){return X(this._direct)}get inverseMatrix(){return X(this._inverse)}get i(){return M.fromValues(this._direct[0],this._direct[1],this._direct[2])}get j(){return M.fromValues(this._direct[4],this._direct[5],this._direct[6])}get k(){return M.fromValues(this._direct[8],this._direct[9],this._direct[10])}get o(){return g.fromValues(this._direct[12],this._direct[13],this._direct[14],this._direct[15])}get origin(){return g.fromValues(this._inverse[12],this._inverse[13],this._inverse[14],this._inverse[15])}relative(t){if(t&&Te(t)){const r=new W;return mt(r._direct,t.inverseMatrix,this.directMatrix),A(r._inverse,r._direct),r}return t.relative(this)}absolute(t){return t.compose(this)}};D(St,"from2Vectors",(e,t,r)=>{const o=new St,i=zt(t)?t:M.fromVector(t),s=M.crossProduct(i,zt(r)?r:M.fromVector(r)),n=[...M.crossProduct(s,i).coordinates,...s.coordinates,...i.coordinates,...e.coordinates];return o._direct=ee(...n),A(o._inverse,o._direct),o});let Ct=St;const Te=e=>e&&e.isFrame!==void 0?e.isFrame():!1;class z{constructor(){D(this,"_direct"),D(this,"_inverse"),this._direct=vt(),this._inverse=vt()}static identity(){return new z}static fromValues(t,r,o,i){const s=new z;return s._direct=Ve(t,r,o,i),J(s._inverse,s._direct),s}static fromAngles(t,r,o){return z.rotationX(t).rotateY(r).rotateZ(o)}static fromQuat(t){const r=new z;return r._direct=dt(t),J(r._inverse,r._direct),r}static fromArray(t){const r=new z;return r._direct=dt(t),J(r._inverse,r._direct),r}static fromTransform(t){const r=Et();te(r,t.directMatrix);const o=new z;return o._direct=Ht(o._direct,r),J(o._inverse,o._direct),o}static rotationX(t){const r=new z;return we(r._direct,r._direct,t),J(r._inverse,r._direct),r}static rotationY(t){const r=new z;return Me(r._direct,r._direct,t),J(r._inverse,r._direct),r}static rotationZ(t){const r=new z;return be(r._direct,r._direct,t),J(r._inverse,r._direct),r}rotateX(t){return this.compose(z.rotationX(t))}rotateY(t){return this.compose(z.rotationY(t))}rotateZ(t){return this.compose(z.rotationZ(t))}inverse(){const t=new z;return t._direct=dt(this._inverse),t._inverse=dt(this._direct),t}compose(t){const r=new z;return ye(r._direct,this._direct,t._direct),J(r._inverse,r._direct),r}get quat(){return this._direct}}const N=e=>e/180*Math.PI;var Se=Object.defineProperty,Ce=(e,t,r)=>t in e?Se(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,S=(e,t,r)=>(Ce(e,typeof t!="symbol"?t+"":t,r),r);const At=()=>{let e=0,t=performance.now(),r=0;const o=[];return{getFPS:()=>o.reduce((i,s)=>i+s,0)/o.length,measureFPS:()=>{const i=performance.now();return e=i-t,e<=1?o[r]:(r=(r+1)%10,o[r]=1e3/e,t=i,e)},getLastTimeSpan:()=>e}},Pe=async({device:e},t)=>{const r=e.createShaderModule({code:t});return(await r.getCompilationInfo()).messages.forEach(o=>{let i=o.message;o.lineNum&&(i=`Line ${o.lineNum}:${o.linePos} - "${t.substr(o.offset,o.length+40)}"
`+o.message),console.error("WGSL error: ",i)}),r},Le=e=>{const t=3*T.bufferSize+8+4*(2*C.bufferSize)+4*(C.bufferSize+g.bufferSize),r=4,o=r*(2*C.bufferSize)+r*(C.bufferSize+g.bufferSize)+4*4+2*4,i=e.device.createBuffer({label:"TransBuffer",size:t+t%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s=e.device.createBuffer({label:"LightBuffer",size:o+o%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),n=[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],a=e.device.createBindGroupLayout({label:"transformations",entries:n}),c=[{binding:0,resource:{buffer:i}},{binding:1,resource:{buffer:s}}],u=e.device.createBindGroup({label:"SceneData",layout:a,entries:c});return[a,u,[i,s]]},ze=e=>{const t=2*T.bufferSize,r=e.device.createBuffer({label:"TransBuffer",size:t+t%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],i=e.device.createBindGroupLayout({label:"modelTransf",entries:o}),s=[{binding:0,resource:{buffer:r}}],n=e.device.createBindGroup({label:"SceneData",layout:i,entries:s});return[i,n,[r]]},Ae=e=>{const t=e.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),r=e.device.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],i=e.device.createBindGroupLayout({label:"color",entries:o}),s=[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:r}}],n=e.device.createBindGroup({label:"color",layout:i,entries:s});return[i,n,[t,r]]},De=(e,t)=>{const{device:r}=e,o={addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",maxAnisotropy:1},i=r.createSampler(o),s=t.map(l=>l.view),n=[...s.map((l,f)=>({binding:f,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}})),{binding:4,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}}],a=e.device.createBindGroupLayout({label:"texture",entries:n}),c=[...s.map((l,f)=>({binding:f,resource:l})),{binding:4,resource:i}],u=e.device.createBindGroup({label:"texture",layout:a,entries:c});return[a,u]},Fe=(e,t)=>{const{device:r}=e,[o,i,s]=Le(e),[n,a,c]=Ae(e),[u,l,f]=ze(e),[h,d]=t.length>0?De(e,t):[void 0,void 0],p=h?[o,n,u,h]:[o,n,u],v={sceneGroup:i,colorGroup:a,modelGroup:l,texturesGroup:d},m={sceneBuffers:s,colorBuffers:c,modelBuffers:f};return[r.createPipelineLayout({bindGroupLayouts:p}),v,m]},Dt=(e,t,r)=>{const{device:o,format:i}=e,s=r.map(n=>{const[a,c,u]=Fe(e,n.materials),l={label:n.label,layout:a,multisample:{count:1},vertex:{module:t,entryPoint:n.vertexShader,buffers:[n.bufferLayout]},fragment:{module:t,entryPoint:n.fragmentShader,targets:[{format:i,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:n.primitives,cullMode:n.cullMode},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}},f=o.createRenderPipeline(l),h={...l,label:`${n.label}-alt`,primitive:{topology:n.primitives==="line-list"?n.primitives:"line-strip",cullMode:"none"}},d=o.createRenderPipeline(h);return[n.id,{id:n.id,type:n.label,pipeline:f,altPipeline:d,geoRenderable:n,uniformBuffers:u,bindGroups:c}]});return new Map(s)},Ge=(e,t)=>{let r="none",o=[0,0],i=[0,0],s=[0,0];e.addEventListener("contextmenu",n=>{n.preventDefault()}),e.addEventListener("wheel",n=>{n.ctrlKey?t.tilt(n.deltaY):t.zoom(n.deltaY)}),e.addEventListener("pointerdown",n=>{e.setPointerCapture(n.pointerId),o=[n.offsetX,n.offsetY],i=[0,0],s=o,r=`${n.ctrlKey?"ctrl-":""}mouse-${n.button}`,t.move(r,{origin:o,direction:i},s)}),e.addEventListener("pointermove",n=>{if(r==="none")return;const a=[n.offsetX,n.offsetY];i=[a[0]-s[0],a[1]-s[1]],s=a,t.move(r,{origin:o,direction:i},s)}),e.addEventListener("pointerup",n=>{e.releasePointerCapture(n.pointerId);const a=[n.offsetX,n.offsetY];i=[a[0]-o[0],a[1]-o[1]],i[0]<=.9&&i[1]<=.9&&t.click("none",a),t.move("none",{origin:o,direction:i},a),r="none"})},Be=(e,t,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const o=e.createBuffer({size:t.byteLength,usage:r,mappedAtCreation:!0});return new Float32Array(o.getMappedRange()).set(t),o.unmap(),o},Ft=(e,t,r)=>{const{canvas:o}=e,i=$e(window.getComputedStyle(o).backgroundColor);return{colorAttachments:[{view:t,clearValue:i,loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:r,depthClearValue:1,depthStoreOp:"store",depthLoadOp:"clear"}}},Ie=async e=>{const t=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!t)throw new Error("WebGPU:adapter is NOT available!");const r=await t.requestDevice();if(!r)throw new Error("WebGPU:device is NOT available!");const o=e.getContext("webgpu");if(!o)throw new Error("WebGPU:context from instantiated Canvas not available!");const i=navigator.gpu.getPreferredCanvasFormat();return o.configure({device:r,format:i,usage:GPUTextureUsage.RENDER_ATTACHMENT,alphaMode:"opaque"}),console.info("WegGPU: maxBindGroups:",r.limits.maxBindGroups),{context:o,device:r,canvas:e,format:i}},Ne=e=>typeof e=="string",Ue=(e,[t,r],o)=>({view:o&&o.view?o.view(e.view):T.lookAt(g.fromValues(-5,-5,-5),g.fromValues(0,0,0),M.fromValues(0,0,1)),projection:o&&o.projection?o.projection(e.projection):T.perspective(Math.PI/5,t/r,.1,100)}),Ee=e=>e!=null,Re=`const MAX_DIR_LIGHTS: u32 = 4;
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

struct TextureAlpha {
    value: f32
};

@group(0) @binding(0) var<uniform> sceneData: SceneData;
@group(0) @binding(1) var<uniform> sceneLights: SceneLights;
@group(1) @binding(0) var<uniform> myColor: ColorData;
@group(1) @binding(1) var<uniform> textureAlpha: TextureAlpha;
@group(2) @binding(0) var<uniform> myModel: ModelData;
@group(3) @binding(0) var myTexture0: texture_2d<f32>;
@group(3) @binding(1) var myTexture1: texture_2d<f32>;
@group(3) @binding(2) var myTexture2: texture_2d<f32>;
@group(3) @binding(3) var myTexture3: texture_2d<f32>;
@group(3) @binding(4) var mySampler: sampler;

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
  var shininess: f32 = 92.0;
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

fn computeDistanceToCameraAttenuation( d: f32 ) -> f32 {
  if ( d< 50 ) {
    return 1.0;
  }
  return 1 - clamp((d-49)/800 , 0.0, 1.0);
}


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

  let textMix = vec4<f32>(1-textureAlpha.value);
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
  let prec: f32 = 12.0;
  let textDim = textureDimensions(myTexture1, 0);
  let texelSize = vec2<f32>(1.0 / f32(textDim.x), 1.0/ f32(textDim.y)); // Assuming mip level 0
  let heightLeft = textureSample(myTexture1, mySampler, in.texCoord - vec2<f32>(texelSize.x*prec, 0.0)).r;
  let heightRight = textureSample(myTexture1, mySampler, in.texCoord + vec2<f32>(texelSize.x*prec, 0.0)).r;
  let heightUp = textureSample(myTexture1, mySampler, in.texCoord + vec2<f32>(0.0, texelSize.y*prec)).r;
  let heightDown = textureSample(myTexture1, mySampler, in.texCoord - vec2<f32>(0.0, texelSize.y*prec)).r;


  let dU = (heightRight - heightLeft) / (  prec * prec * texelSize.x);
  let dV = (heightUp - heightDown) / ( prec * prec * texelSize.y) ;

  let deltaVector = vec3<f32>(dU, dV, 0.0);
  let N = normalize(in.normal);
  let T = normalize(in.tangent);
  let B = cross(N, T);
  let tangentSpaceNormal = vec3<f32>(deltaVector.x, deltaVector.y, 1.0);
  let newNormal = normalize(T * tangentSpaceNormal.x + B * tangentSpaceNormal.y + N * tangentSpaceNormal.z);
  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, newNormal, sceneLights );
  let specular: vec3<f32> = computeSpecularColor( in.eye, in.pos, newNormal, sceneLights, texColor );

  let att: f32 = computeDistanceToCameraAttenuation(in.viewZ);

  let textMix = vec4<f32>(1-textureAlpha.value);
  let finalColor = mix(texColor, myColor.color, textMix); // mixed the two colors based on alpha.
  return clamp(
    vec4<f32>((finalColor.rgb * diffuse + specular) * att, max(finalColor.a, texColor.a)),
    vec4<f32>(0, 0, 0, 0.0), vec4<f32>(1.0, 1.0, 1.0, 1.0)
  );
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
`,Ze="",ke=e=>{const{canvas:t,context:r,device:o}=e;let[i,s]=[t.width,t.height];return new ResizeObserver(n=>{const{width:a,height:c}=n[0].contentRect;[i,s]=[Math.round(a),Math.round(c)]}).observe(t.parentElement),n=>{var a,c;if(i===t.width&&s===t.height){const f=r.getCurrentTexture(),h=n.colorAttachments;return h[0].view=f.createView({label:"ColorView"}),n}t.width=i,t.height=s,(a=e._colorTexture)==null||a.destroy(),(c=e._depthTexture)==null||c.destroy(),e._depthTexture=o.createTexture({label:"DepthTexture",sampleCount:1,size:[i,s,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),e._colorTexture=o.createTexture({label:"ColorTexture",size:{width:i,height:s,depthOrArrayLayers:1},sampleCount:1,format:e.format,usage:GPUTextureUsage.RENDER_ATTACHMENT});const u=n.colorAttachments;u[0].view=e._colorTexture.createView({label:"ColorView"});const l=n.depthStencilAttachment;return l.view=e._depthTexture.createView({label:"DepthView"}),n}};class Lt{constructor(t,r,o,i){S(this,"canvas"),S(this,"context"),S(this,"device"),S(this,"format"),S(this,"_handleOnRender"),S(this,"_vertexCount",0),S(this,"_activeRenderLoop",!1),S(this,"_pipelineMode","default"),S(this,"_shaderModule"),S(this,"_pipelines",new Map),S(this,"_transformations",{projection:T.identity(),view:T.identity()}),S(this,"_cameraTransHandler"),S(this,"_lightsHandler"),S(this,"_modelHandlers",{}),S(this,"_fps",At()),S(this,"_rebuildViewTexture"),S(this,"_colorTexture"),S(this,"_depthTexture"),S(this,"_ambientLight",[.3,.3,.3,1]),S(this,"_dirLights",[{dir:M.fromValues(0,0,1),col:[.4,.4,.4,0]},{dir:M.fromValues(1,1,1),col:[.4,.3,.3,0]},{dir:M.fromValues(1,0,0),col:[.5,.5,.5,0]},{dir:M.fromValues(-1,-1,-1),col:[.3,.3,.3,0]}]),S(this,"_pointLights",[{pos:g.fromValues(-12,12,8),col:[.5,.5,.2,0]},{pos:g.fromValues(12,12,8),col:[.4,.2,.2,0]},{pos:g.fromValues(-12,-12,8),col:[.2,.2,.5,0]},{pos:g.fromValues(12,-12,8),col:[.5,.1,.5,0]}]),S(this,"render",()=>{const{device:s}=this;this._vertexCount=0,this._handleOnRender&&this._handleOnRender(this);let n=Ft(this,this._colorTexture.createView(),this._depthTexture.createView());this._rebuildViewTexture&&(n=this._rebuildViewTexture(n));const a=s.createCommandEncoder(),c=a.beginRenderPass(n),u=this._fps.getLastTimeSpan();this.updateLights(u),this.pipelines.filter(({geoRenderable:l})=>l.colors[0][3]===1).forEach((l,f)=>{this.renderPipeline(l,f,c,u)}),this.pipelines.filter(({geoRenderable:l})=>l.colors[0][3]<1).forEach((l,f)=>{this.renderPipeline(l,f,c,u)}),c.end(),s.queue.submit([a.finish()])}),this.canvas=t,this.context=r,this.device=o,this.format=i,this._rebuildViewTexture=ke(this),this._colorTexture=o.createTexture({size:{width:t.width,height:t.height,depthOrArrayLayers:1},sampleCount:1,format:this.format,usage:GPUTextureUsage.RENDER_ATTACHMENT}),this._depthTexture=o.createTexture({label:"DepthTexture",sampleCount:1,size:[t.width,t.height,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.device.lost.then(()=>{console.log("WebGPU:device lost")})}get vertexCount(){return this._vertexCount}get fps(){return this._fps.getFPS()}get dirLights(){return this._dirLights}get pontLights(){return this._pointLights}get(...t){return t.map(r=>this._pipelines.get(r)).filter(Ee).map(r=>r.geoRenderable)}setAmbientLight(t){this._ambientLight=t}setLight(t,r,o){switch(t){case"directional":this._dirLights[r]=o;break;case"point":this._pointLights[r]=o;break}}static async build(t){return Ie(t).then(({canvas:r,context:o,device:i,format:s})=>new Lt(r,o,i,s))}setPipelineMode(t){this._pipelineMode=t}get pipelines(){return[...this._pipelines.values()]}getScene(){return[...this._pipelines.values()].map(({geoRenderable:t})=>t)}async setupShaders(t){if(this._shaderModule)return this;let r;if(Ne(t))switch(t){case"standard-3d":r=Re;break;case"standard-2d":default:r=Ze;break}else r=t.source;return this._shaderModule=await Pe(this,r),this}setScene(t){if(!this._shaderModule)throw new Error("WebGPU:shader module is NOT available!");t.forEach(r=>{r.buildGpuBuffer(this)}),this._pipelines=Dt(this,this._shaderModule,t),Ft(this,this._colorTexture.createView(),this._depthTexture.createView())}addToScene(t){if(!this._shaderModule)throw new Error("WebGPU:shader module is NOT available!");t.forEach(r=>{r.buildGpuBuffer(this)}),Dt(this,this._shaderModule,t).forEach((r,o)=>{this._pipelines.set(o,r)})}removeFromScene(t){return this._pipelines.delete(t)}clearScene(){this._pipelines.clear()}captureMouseMotion(t){Ge(this.canvas,{move:(t==null?void 0:t.move)??((r,o,i)=>{}),click:(t==null?void 0:t.click)??((r,o)=>{}),zoom:(t==null?void 0:t.zoom)??(r=>{}),tilt:(t==null?void 0:t.tilt)??(r=>{})})}sceneIntoBuffer(t){const{device:r}=this,{projection:o,view:i}=this._transformations,s=i.invert();let n=0;r.queue.writeBuffer(t[0],n,i.buffer()),n+=T.bufferSize,r.queue.writeBuffer(t[0],n,s.buffer()),n+=T.bufferSize,r.queue.writeBuffer(t[0],n,o.buffer()),n+=T.bufferSize;let a=0;const c=new Float32Array(this._dirLights.flatMap(({dir:f,col:h})=>[...f.coordinates,...h]));r.queue.writeBuffer(t[1],a,c),a+=c.byteLength;const u=new Float32Array(this._pointLights.flatMap(({pos:f,col:h})=>[...f.coordinates,...h]));r.queue.writeBuffer(t[1],a,u),a+=u.byteLength;const l=new Float32Array(this._ambientLight);r.queue.writeBuffer(t[1],a,l),a+=l.byteLength,r.queue.writeBuffer(t[1],a,new Uint32Array([this._dirLights.length,this._pointLights.length]))}updateLights(t){if(!this._lightsHandler)return;const{dirLights:r,posLights:o}=this._lightsHandler;r&&r(t,this._dirLights),o&&o(t,this._pointLights)}onRender(t){this._handleOnRender=t}renderPipeline(t,r,o,i){const{pipeline:s,altPipeline:n,uniformBuffers:a,bindGroups:c,geoRenderable:u}=t,{device:l}=this;if(r===0&&(this.sceneIntoBuffer(a.sceneBuffers),o.setBindGroup(0,c.sceneGroup)),u.display==="none")return;const f=this._pipelineMode==="default"?s:n;o.setPipeline(f),this._modelHandlers[u.id]&&u.transform(i,this._modelHandlers[u.id]),l.queue.writeBuffer(a.modelBuffers[0],0,u.transformationData),o.setBindGroup(2,c.modelGroup),c.texturesGroup&&o.setBindGroup(3,c.texturesGroup),u.buffers.forEach((h,d)=>{const p=new Float32Array(u.colors[d]);l.queue.writeBuffer(a.colorBuffers[0],0,p),l.queue.writeBuffer(a.colorBuffers[1],0,new Float32Array([u.textureAlpha])),o.setBindGroup(1,c.colorGroup);const v=u.getVertexCountPerStrip(d);this._vertexCount+=v,o.setVertexBuffer(0,h),o.draw(v)})}renderLoop(){const{width:t,height:r}=this.canvas;this._transformations=Ue(this._transformations,[t,r],this._cameraTransHandler),this.render(),this._fps.measureFPS(),this._activeRenderLoop&&requestAnimationFrame(this.renderLoop.bind(this))}beginRenderLoop(t){this._fps=At(),this._cameraTransHandler=t==null?void 0:t.camera,this._lightsHandler=t==null?void 0:t.lights,this._modelHandlers=(t==null?void 0:t.models)??{},this._activeRenderLoop=!0,this.renderLoop()}endRenderLoop(){this._activeRenderLoop=!1}}let lt=new Map;const Oe=async e=>{var t,r;if(!navigator.gpu)return Promise.reject(new Error("WebGPU is not supported in this browser!"));const o=(t=lt.get(e.id))==null?void 0:t.gpu;if(o)return Promise.resolve(o);if((r=lt.get(e.id))!=null&&r.initializing)return new Promise((s,n)=>{setTimeout(()=>{var a;const c=(a=lt.get(e.id))==null?void 0:a.gpu;if(c)return console.warn("WebGPU connection already initialized. Reusing previous connection."),s(c);n(new Error("WebGPU already initialization is taking too long!"))},100)});lt.set(e.id,{initializing:!0});const i=await Lt.build(e);return lt.set(e.id,{initializing:!1,gpu:i}),Promise.resolve(i)},qe=(e,t,r)=>{const{device:o}=e,i="rgba8unorm",s={label:t,size:[r.width,r.height,1],format:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT},n=o.createTexture(s);o.queue.copyExternalImageToTexture({source:r},{texture:n},[r.width,r.height]);const a=n.createView({label:`${t}-view`});return{name:t,texture:n,view:a}},$e=e=>{let t=[];const r=/rgba?\(([^)]+)\)/.exec(e);if(r&&r[1]&&(t=r[1].split(",").map(a=>parseFloat(a.trim()))),t.length<3)throw new Error("Invalid RGB/RGBA format");const o=t[0]/255,i=t[1]/255,s=t[2]/255,n=t.length===4?t[3]:1;return{r:o,g:i,b:s,a:n}},Ye=async(e,t)=>{const r=new URL(t,window.location.href);return new Promise((o,i)=>{const s=new Image;s.src=r.href,s.onerror=n=>{i(n)},s.onload=()=>{createImageBitmap(s).then(n=>qe(e,r.pathname,n)).then(n=>o([e,n]))}})},Gt=async(e,t)=>Promise.all(t.map(r=>Ye(e,r))).then(r=>Promise.resolve([e,r.map(([,o])=>o)])),H=4;class ct{constructor(t,r,o){S(this,"_body",null),S(this,"_id"),S(this,"_bufferData",null),S(this,"_vertices",[]),S(this,"_vertexColors",[]),S(this,"_vertexNormals",[]),S(this,"_vertexTangents",[]),S(this,"_vertexTextureCoords",[]),S(this,"_stripColors",[]),S(this,"_textureAlpha",1),S(this,"_vertexByteSize",0),S(this,"_buffers",[]),S(this,"_bufferLayout",null),S(this,"_topology","triangle-list"),S(this,"_cullMode","back"),S(this,"_materials",[]),S(this,"_transformation",{rotation:z.identity(),scale:C.fromValues(1,1,1),translation:C.fromValues(0,0,0)}),S(this,"_transformationData"),S(this,"display","full"),this._id=t,this._topology=r,this._vertexByteSize=3*4,this._stripColors=o.colors??[[0,0,0,0]],this._textureAlpha=o.textureAlpha??1,this._transformationData=new Float32Array(32)}get id(){return this._id}get textureAlpha(){return this._textureAlpha}get label(){return this._topology}get translationVector(){return this._transformation.translation??C.fromValues(0,0,0)}get orientationRotation(){return this._transformation.rotation??z.identity()}get scaleVector(){return this._transformation.scale??C.fromValues(1,1,1)}get hasTextures(){return this._vertexTextureCoords.length>0&&this._materials.length>0}get materials(){return this._materials}get vertexShader(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this.hasTextures?"vertexTextureShader":"vertexColorShader":"vertexLineShader"}get fragmentShader(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this._materials.length==2?"fragmentTextureBumpShader":this.hasTextures?"fragmentTextureShader":"fragmentColorShader":"fragmentLineShader"}get colors(){return this._stripColors}get primitives(){return this._topology}get cullMode(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this._cullMode:"none"}get vertexCount(){return this._vertices.reduce((t,r)=>t+r.length/3,0)}get body(){return this._body}get transformation(){return T.fromRotationTranslationScale(this._transformation.rotation??z.identity(),this._transformation.translation??C.fromValues(0,0,0),this._transformation.scale??C.fromValues(1,1,1))}get transformationData(){const t=this.transformation;return this._transformationData.set([...t.values]),this._transformationData.set([...t.transpose().invert().values],16),this._transformationData}addMaterial(t){return this._materials.push(t),this.materials.length-1}setBody(t){return this._body=t,this}scale(t){return this._transformation.scale=this.scaleVector.multiply(t),this}translate(t){return this._transformation.translation=this.translationVector.add(t),this}rotate(t){return this._transformation.rotation=this.orientationRotation.compose(t),this}rotoTranslate(t,r){const o=this._transformation;return o.rotation=t,o.translation=r,this}transform(t,r){return this._transformation=r(t,this._transformation),this}getVertexCountPerStrip(t){return this._vertices[t].length/3}get vertexByteSize(){return this._vertexByteSize}getByteSizePerStrip(t=0){return this._vertices[t].length*H+(this._vertexColors.length>0?this._vertexColors[t].length*H:0)+(this._vertexNormals.length>0?this._vertexNormals[t].length*H:0)+(this._vertexTangents.length>0?this._vertexTangents[t].length*H:0)+(this._vertexTextureCoords.length>0?this._vertexTextureCoords[t].length*H:0)}setCullMode(t){return this._cullMode=t,this}addVertices(t){this._vertices.push(t)}getBufferData(){return this._bufferData!==null?this._bufferData:(this._bufferData=this._vertices.map((t,r)=>{const o=[];for(let i=0,s=0,n=0,a=0;i<t.length;i+=3,s+=4,n+=3,a+=2){const c=[t[i+0],t[i+1],t[i+2]];this._vertexColors.length>r&&(c.push(this._vertexColors[r][s+0]),c.push(this._vertexColors[r][s+1]),c.push(this._vertexColors[r][s+2]),c.push(this._vertexColors[r][s+3])),this._vertexNormals.length>r&&(c.push(this._vertexNormals[r][n+0]),c.push(this._vertexNormals[r][n+1]),c.push(this._vertexNormals[r][n+2])),this._vertexTangents.length>r&&(c.push(this._vertexTangents[r][n+0]),c.push(this._vertexTangents[r][n+1]),c.push(this._vertexTangents[r][n+2])),this._vertexTextureCoords.length>r&&(c.push(this._vertexTextureCoords[r][a+0]),c.push(this._vertexTextureCoords[r][a+1])),o.push(...c)}return new Float32Array(o)}),this._bufferData)}get layouts(){let t=0,r=0;const o=[{shaderLocation:t,offset:0,format:"float32x3"}];return t+=1,r+=3*H,this._vertexColors.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x4"}),t+=1,r+=4*H),this._vertexNormals.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x3"}),t+=1,r+=3*H),this._vertexTangents.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x3"}),t+=1,r+=3*H),this._vertexTextureCoords.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x2"}),t+=1,r+=2*H),o}get buffers(){return this._buffers}get bufferLayout(){if(this._bufferLayout===null)throw new Error("TriangleData: Buffer layout is not available! - Did you call buildGpuBuffer() ?");return this._bufferLayout}buildGpuBuffer(t){this._buffers=this.getBufferData().map(r=>Be(t.device,r)),this._bufferLayout={arrayStride:this.vertexByteSize,attributes:this.layouts}}addColors(t){this._vertexColors.length===0&&(this._vertexByteSize+=4*4),this._vertexColors.push(t)}addNormals(t){var r;this._vertexNormals.length===0&&(this._vertexByteSize+=3*4),(r=this._vertexNormals)==null||r.push(t)}addTangents(t){var r;this._vertexTangents.length===0&&(this._vertexByteSize+=3*4),(r=this._vertexTangents)==null||r.push(t)}addTextures(t){this._vertexTextureCoords.length===0&&(this._vertexByteSize+=2*4),this._vertexTextureCoords.push(t)}}const Bt=(e,t)=>{const r=e[t+0],o=e[t+1],i=e[t+2],s=C.fromPoints(o,r),n=C.fromPoints(i,r);return M.crossProduct(s,n)},He=(e,t)=>{const r=e[t-2],o=e[t-1],i=e[t-0],s=C.fromPoints(o,r),n=C.fromPoints(o,i);return M.crossProduct(n,s)},je=(e,t)=>{const r=[],o=e==="triangle-list"?3:1;if(e==="triangle-strip"){let i=Bt(t,0);r.push(i),r.push(i);for(let s=2;s<t.length;s+=1)He(t,s),r.push(i)}else for(let i=0;i<t.length-2;i+=o){const s=Bt(t,i);r.push(s),r.push(s),r.push(s)}return r},it=(e,t,r)=>{const{w:o,h:i}=t,s=o/2,n=i/2,a=e.origin,c=[],u=[],l=[],f=M.fromValues(0,0,1),h=M.fromValues(1,0,0);c.push(g.fromValues(a.x-s,a.y-n,0)),c.push(g.fromValues(a.x+s,a.y-n,0)),c.push(g.fromValues(a.x-s,a.y+n,0)),c.push(g.fromValues(a.x-s,a.y+n,0)),c.push(g.fromValues(a.x+s,a.y-n,0)),c.push(g.fromValues(a.x+s,a.y+n,0)),u.push(f,f,f,f,f,f),l.push(h,h,h,h,h,h);const d=[],{pos:p,size:v}=r,{w:m,h:V}=v,_=m/2,x=V/2;d.push({u:p.u+_,v:p.v-x}),d.push({u:p.u-_,v:p.v-x}),d.push({u:p.u+_,v:p.v+x}),d.push({u:p.u+_,v:p.v+x}),d.push({u:p.u-_,v:p.v-x}),d.push({u:p.u-_,v:p.v+x});const w=c.map(b=>b.absolute(e)),y=u.map(b=>b.absolute(e));return[w,y,l,d]},st=(e,t)=>{const r=t.transpose().invert();return[e[0].map(o=>o.map(t).triplet).flat(),e[1].map(o=>o.map(r).triplet).flat(),e[2].map(o=>o.map(r).triplet).flat(),e[3].map(o=>[o.u,o.v]).flat()]},We=(e,t,r=1)=>{const o=[],i=Math.PI*2,s=i/e,n=[],a=[],c=M.fromValues(0,0,1),u=Math.atan(1/.5),l=Math.PI/2-u,f=Math.sin(l),h=-.5+r;if(r>=1)for(let d=0;d<i;d+=s){const p=g.fromValues(0,0,-t),v=g.fromValues(.5*Math.cos(d),.5*Math.sin(d),t),m=g.fromValues(.5*Math.cos(d+s),.5*Math.sin(d+s),t);o.push(p),o.push(v),o.push(m);const V=M.fromValues(Math.cos(d),Math.sin(d),f),_=M.fromValues(Math.cos(d+s),Math.sin(d+s),f),x=V;n.push(x,V,_);const w=M.fromVector(x.crossProduct(c)),y=M.fromVector(V.crossProduct(c)),b=M.fromVector(_.crossProduct(c));a.push(w,y,b)}else{const d=(1-r)/Math.sin(u)*Math.cos(u);for(let p=0;p<i;p+=s){const v=g.fromValues(d*Math.cos(p),d*Math.sin(p),h),m=g.fromValues(.5*Math.cos(p),.5*Math.sin(p),t),V=g.fromValues(.5*Math.cos(p+s),.5*Math.sin(p+s),t),_=g.fromValues(d*Math.cos(p+s),d*Math.sin(p+s),h),x=M.fromValues(Math.cos(p),Math.sin(p),f),w=M.fromValues(Math.cos(p+s),Math.sin(p+s),f);o.push(v),o.push(m),o.push(V),n.push(x,x,w),o.push(V),o.push(_),o.push(v),n.push(w,w,x);const y=M.fromVector(x.crossProduct(c)),b=M.fromVector(w.crossProduct(c));a.push(x,y,b),a.push(w,b,y)}}return[o,n,a]},gt=(e,t,r,o=.5)=>{const i=o,s=M.fromValues(0,0,1),n=M.fromValues(0,0,-1),a=[],c=[],u=r==="up"?0:Math.PI*2,l=r==="up"?Math.PI*2/e:-Math.PI*2/e,f=r==="up"?h=>h<Math.PI*2:h=>h>0;for(let h=u;f(h);h+=l){const d=g.fromValues(0,0,t),p=g.fromValues(i*Math.cos(h),i*Math.sin(h),t),v=g.fromValues(i*Math.cos(h+l),i*Math.sin(h+l),t);c.push(d),c.push(p),c.push(v),r==="up"?a.push(s,s,s):a.push(n,n,n)}return[c,a]},Xe=(e,t,r)=>{const o=[],i=[],s=[],n=Math.PI/e,a=g.fromValues(0,0,t),c=g.fromValues(0,0,r),u=M.fromValues(0,0,1);for(let l=0;l<Math.PI*2;l+=n){const f=g.fromValues(.5*Math.cos(l),.5*Math.sin(l),t),h=M.fromPoints(f,a);o.push(f),i.push(h),s.push(M.fromVector(h.crossProduct(u)));const d=g.fromValues(.5*Math.cos(l+n),.5*Math.sin(l+n),t),p=M.fromPoints(d,a);o.push(d),i.push(p),s.push(M.fromVector(p.crossProduct(u)));const v=g.fromValues(.5*Math.cos(l),.5*Math.sin(l),r),m=M.fromPoints(v,c);o.push(v),i.push(m),s.push(M.fromVector(m.crossProduct(u)));const V=g.fromValues(.5*Math.cos(l),.5*Math.sin(l),r),_=M.fromPoints(V,c);o.push(V),i.push(_),s.push(M.fromVector(_.crossProduct(u)));const x=g.fromValues(.5*Math.cos(l+n),.5*Math.sin(l+n),t),w=M.fromPoints(x,a);o.push(x),i.push(w),s.push(M.fromVector(w.crossProduct(u)));const y=g.fromValues(.5*Math.cos(l+n),.5*Math.sin(l+n),r),b=M.fromPoints(y,c);o.push(y),i.push(b),s.push(M.fromVector(b.crossProduct(u)))}return[o,i,s]},xt=e=>{let t=Math.asin(e.z);return[(Math.atan2(e.y,e.x)+Math.PI)/(2*Math.PI),.5-t/Math.PI]},yt=e=>[(Math.atan2(e.y,e.x)+Math.PI)/(2*Math.PI),e.z+.5],Wt=(e,t,r)=>{const o=Math.min(e[0],t[0],r[0]),i=Math.max(e[0],t[0],r[0]);Math.abs(i-o)>.8&&(e[0]<.4&&t[0]<.4?r[0]-=1:e[0]<.4&&r[0]<.4?t[0]-=1:t[0]<.4&&r[0]<.4?e[0]-=1:e[0]>.6&&t[0]>.6?r[0]+=1:e[0]>.6&&r[0]>.6?t[0]+=1:t[0]>.6&&r[0]>.6&&(e[0]+=1))},Ke=(e,t)=>{const{id:r,textureCoordinates:o}=t,i=T.rotationX(N(-90)),s=T.rotationX(N(180)),n=T.rotationX(N(90)),a=T.rotationZ(N(-90)).rotationY(N(90)),c=T.rotationZ(N(90)).rotationY(N(-90)),u=Ct.from2Vectors(g.fromValues(0,0,.5),M.fromValues(0,0,1),M.fromValues(1,0,0)),l=u.map(s),f=u.map(i),h=u.map(n),d=u.map(a),p=u.map(c),v={w:.25,h:.25},m=it(u,{w:1,h:1},{pos:{u:.25+.25/2,v:.25/2},size:v}),V=it(l,{w:1,h:1},{pos:{u:.25+.25/2,v:.5+.25/2},size:v}),_=it(f,{w:1,h:1},{pos:{u:.25+.25/2,v:.25+.25/2},size:v}),x=it(h,{w:1,h:1},{pos:{u:.75+.25/2,v:.25+.25/2},size:v}),w=it(d,{w:1,h:1},{pos:{u:0+.25/2,v:.25+.25/2},size:v}),y=it(p,{w:1,h:1},{pos:{u:.5+.25/2,v:.25+.25/2},size:v}),[b,P,F,G]=st(m,e),E=st(V,e),R=st(_,e),Z=st(x,e),k=st(w,e),L=st(y,e);b.push(...E[0],...R[0],...Z[0],...k[0],...L[0]),P.push(...E[1],...R[1],...Z[1],...k[1],...L[1]),F.push(...E[2],...R[2],...Z[2],...k[2],...L[2]),G.push(...E[3],...R[3],...Z[3],...k[3],...L[3]);const rt=new ct(r,"triangle-list",t);return rt.addVertices(new Float32Array(b)),rt.addNormals(new Float32Array(P)),rt.addTangents(new Float32Array(F)),o&&rt.addTextures(new Float32Array(G)),rt},Qe=()=>Ke,Je=(e,t)=>{const{steps:r,id:o,textureCoordinates:i}=t,s=e.transpose().invert(),n=[],a=[],c=[],u=[],[l,f]=gt(r,.5,"up"),[h,d]=gt(r,-.5,"down"),[p,v,m]=Xe(r,-.5,.5);if(n.push(...l.map(_=>_.map(e))),n.push(...h.map(_=>_.map(e))),n.push(...p.map(_=>_.map(e))),i){let _=0,x=0;const w=l.map(P=>[P.x+.5,P.y+.5]),y=h.map(P=>[P.x+.5,P.y+.5]),b=p.map(P=>{const F=P.z+.5;let G=(Math.atan2(P.y,P.x)+Math.PI)/(2*Math.PI);return G<Math.min(_,x)&&(G+=1),x=_,_=G,[G,F]});u.push(...w),u.push(...y),u.push(...b)}a.push(...f.map(_=>_.map(s))),a.push(...d.map(_=>_.map(s))),a.push(...v.map(_=>_.map(s))),c.push(...l.map(_=>M.fromValues(1,0,0).map(s))),c.push(...h.map(_=>M.fromValues(-1,0,0).map(s))),c.push(...m.map(_=>_.map(s)));const V=new ct(o,"triangle-list",t);return V.addVertices(new Float32Array(n.map(_=>_.triplet).flat())),V.addNormals(new Float32Array(a.map(_=>_.triplet).flat())),V.addTangents(new Float32Array(c.map(_=>_.triplet).flat())),i&&V.addTextures(new Float32Array(u.flat())),V},tr=()=>Je,O=.5257311121191336,q=.8506508083520399,er=[M.fromValues(-O,0,q),M.fromValues(O,0,q),M.fromValues(-O,0,-q),M.fromValues(O,0,-q),M.fromValues(0,q,O),M.fromValues(0,q,-O),M.fromValues(0,-q,O),M.fromValues(0,-q,-O),M.fromValues(q,O,0),M.fromValues(-q,O,0),M.fromValues(q,-O,0),M.fromValues(-q,-O,0)],rr=[[0,4,1],[0,9,4],[9,5,4],[4,5,8],[4,8,1],[8,10,1],[8,3,10],[5,3,8],[5,2,3],[2,7,3],[7,10,3],[7,6,10],[7,11,6],[11,0,6],[0,1,6],[6,1,10],[9,0,11],[9,11,2],[9,2,5],[7,2,11]];function or(e,t){return M.fromVector(e.add(t))}function Xt(e,t,r=1){const o=new Map,i=[];function s(n,a){const c=n<a,u=`${c?n:a}-${c?a:n}`,l=o.get(u);if(l)return l;const f=or(C.fromValues(...e[n].triplet),C.fromValues(...e[a].triplet));e.push(f);const h=e.length-1;return o.set(u,h),h}for(const[n,a,c]of t){const u=s(n,a),l=s(n,c),f=s(a,c);i.push([n,u,l]),i.push([a,f,u]),i.push([c,l,f]),i.push([u,f,l])}return r===1?[e,i]:Xt(e,i,r-1)}const ir=(e,t)=>{const{steps:r,id:o,textureCoordinates:i}=t,s=e.transpose().invert(),n=M.fromValues(0,0,1),[a,c]=Xt(er,rr,r),u=[],l=[],f=[],h=[],d=g.fromValues(0,0,0);c.forEach(v=>{const m=g.fromVector(a[v[2]]),V=g.fromVector(a[v[1]]),_=g.fromVector(a[v[0]]),x=M.fromVector(C.fromPoints(m,d)),w=M.fromVector(C.fromPoints(V,d)),y=M.fromVector(C.fromPoints(_,d));if(u.push(...m.map(e).triplet),u.push(...V.map(e).triplet),u.push(..._.map(e).triplet),l.push(...x.map(s).triplet),l.push(...w.map(s).triplet),l.push(...y.map(s).triplet),f.push(...M.fromVector(x.crossProduct(n)).triplet),f.push(...M.fromVector(w.crossProduct(n)).triplet),f.push(...M.fromVector(y.crossProduct(n)).triplet),i){const b=xt(x),P=xt(w),F=xt(y);Wt(b,P,F),h.push(...b),h.push(...P),h.push(...F)}});const p=new ct(o,"triangle-list",t);return p.addVertices(new Float32Array(u)),p.addNormals(new Float32Array(l)),p.addTangents(new Float32Array(f)),i&&p.addTextures(new Float32Array(h)),p},It=()=>ir,sr=(e,t)=>{const{steps:r,id:o}=t,i=e.transpose().invert(),s=e.scaleVector,n=Math.min(s.x,s.y)/r,a=Math.floor(s.x/n),c=Math.floor(s.y/n),u=1/a,l=1/c,f=[];for(let h=0;h<a;h++){f.push([]);for(let d=0;d<c+1;d++)f[h].push(g.fromValues(-.5+u*h,-.5+l*d,0)),f[h].push(g.fromValues(-.5+u*(h+1),-.5+l*d,0))}return f.map(h=>{const d=je("triangle-strip",h);return[new Float32Array(h.map(p=>p.map(e).triplet).flat()),new Float32Array(d.map(p=>p.map(i).triplet).flat()),new Float32Array(h.map(p=>M.fromValues(1,0,0).map(i).triplet).flat()),new Float32Array(h.map(p=>[p.x+.5,p.y+.5]).flat())]}).reduce((h,[d,p,v,m])=>(h.addVertices(d),h.addNormals(p),h.addTangents(v),h.addTextures(m),h),new ct(o,"triangle-strip",t)).setCullMode("none")},nr=()=>sr,ar=(e,t)=>{const{steps:r,id:o,height:i,textureCoordinates:s}=t,n=e.transpose().invert();let a=[];const c=[],u=[],l=[],f=Math.atan(1/.5),h=(1-Math.min(1,i))/Math.sin(f)*Math.cos(f),[d,p]=gt(r,-.5,"down"),[v,m,V]=We(r,-.5,i),[_,x]=gt(r,-.5+i,"up",h);if(a.push(..._),a.push(...d),a.push(...v),s){l.push(..._.map(b=>[b.x+.5,b.y+.5])),l.push(...d.map(b=>[b.x+.5,b.y+.5]));const y=v.length/3;for(let b=0;b<y;b++){const P=yt(v[b*3+0]),F=yt(v[b*3+1]),G=yt(v[b*3+2]);Wt(P,F,G),l.push(P),l.push(F),l.push(G)}}a=a.map(y=>y.map(e)),c.push(...x.map(y=>y.map(n))),c.push(...p.map(y=>y.map(n))),c.push(...m.map(y=>y.map(n))),u.push(..._.map(y=>M.fromValues(1,0,0).map(n))),u.push(...d.map(y=>M.fromValues(-1,0,0).map(n))),u.push(...V.map(y=>y.map(n)));const w=new ct(o,"triangle-list",t);return w.addVertices(new Float32Array(a.map(y=>y.triplet).flat())),w.addNormals(new Float32Array(c.map(y=>y.triplet).flat())),w.addTangents(new Float32Array(u.map(y=>y.triplet).flat())),s&&w.addTextures(new Float32Array(l.flat())),w},cr=()=>ar,lr=(e,t)=>{const{id:r,colors:o,showAxes:i}=t,s=e.scaleVector,n=Math.min(s.x,s.y),a=Math.log10(n),c=Math.max(.6-(a-Math.floor(a)),0),u=Math.min(1,c+.2),l=Math.max(.15,c-.3),f=Math.floor(a)-1,h=Math.floor(a),d=Math.floor(a)-2,p=Math.pow(10,f),v=Math.pow(10,h),m=Math.pow(10,d)*2;console.log("prev tileDim",m,"with total grids",n/m," with alpha",l),console.log("main tileDim",p,"with total grids",n/p," with alpha",c),console.log("next tileDim",v,"with total grids",n/v," with alpha",u);const V=wt(s,p,e,!i),_=wt(s,v,e,!i),x=new ct(r,"line-list",t);if(i){const w=[],y=g.fromValues(-0,0,0).map(e),b=g.fromValues(.5,0,0).map(e),P=g.fromValues(0,-0,0).map(e),F=g.fromValues(0,.5,0).map(e),G=g.fromValues(0,0,0).map(e),E=g.fromValues(0,0,p),R=g.fromValues(-.5,0,0).map(e),Z=g.fromValues(0,0,0).map(e),k=g.fromValues(-0,-.5,0).map(e),L=g.fromValues(0,0,0).map(e);w.push(y,b,P,F,G,E,R,Z,k,L);const rt=[[1,0,0,1],[1,0,0,1],[0,1,0,1],[0,1,0,1],[.1,.1,1,1],[.1,.1,1,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1]];x.addVertices(new Float32Array(w.flatMap(Kt=>Kt.triplet))),x.addColors(new Float32Array(rt.flat()))}if(x.addVertices(new Float32Array(_.flatMap(w=>w.triplet))),x.addColors(new Float32Array(Mt(_,u,o==null?void 0:o[0]))),x.addVertices(new Float32Array(V.flatMap(w=>w.triplet))),x.addColors(new Float32Array(Mt(V,c,o==null?void 0:o[1]))),n/m<100){const w=wt(s,m,e,!i);x.addVertices(new Float32Array(w.flatMap(y=>y.triplet))),x.addColors(new Float32Array(Mt(w,l,o==null?void 0:o[2])))}return x},ur=()=>lr,wt=(e,t,r,o=!0)=>{const i=e.x/t,s=e.y/t,n=1/i,a=1/s,c=-.05,u=[];if(o){const l=g.fromValues(0,-.5,c).map(r),f=g.fromValues(0,.5,c).map(r);u.push(l,f)}for(let l=1;l<i/2;l++){const f=g.fromValues(-n*l,-.5,c).map(r),h=g.fromValues(-n*l,.5,c).map(r);if(u.push(f,h),n*l<.5){const d=g.fromValues(n*l,-.5,c).map(r),p=g.fromValues(n*l,.5,c).map(r);u.push(d,p)}}if(o){const l=g.fromValues(-.5,0,c).map(r),f=g.fromValues(.5,0,c).map(r);u.push(l,f)}for(let l=1;l<s/2;l++){const f=g.fromValues(-.5,-a*l,c).map(r),h=g.fromValues(.5,-a*l,c).map(r);if(u.push(f,h),a*l<.5){const d=g.fromValues(-.5,a*l,c).map(r),p=g.fromValues(.5,a*l,c).map(r);u.push(d,p)}}return u};function Mt(e,t,r){return e.flatMap(()=>r??[.5,.5,.5,t])}const hr=(e,t=[10,10,10])=>{let r=g.fromValues(0,0,0),o=g.fromValues(...t),i=o.x===0&&o.y===0?M.fromValues(0,1,0):M.fromValues(0,0,1),s=[0,0],n=[0,0],a=0,c=0,u=Math.PI/5,l=C.fromPoints(o,r).lengthSquare,f=Ct.lookAt(o,r,i),h=!1;return[{move:(d,p,v)=>{const m=Math.min(e.canvas.width,e.canvas.height),V=Math.max(e.canvas.width,e.canvas.height);let _=Math.log(l)*Math.atan(u)/(V/2),x=u/m*2;switch(d){case"mouse-0":s=[p.direction[0]*_,p.direction[1]*_],h=!0;break;case"mouse-1":n=[-p.direction[0]*x,p.direction[1]*x];break;case"mouse-2":u+=p.direction[1]*x;break;case"none":h=!1;break}},zoom:d=>{const p=Math.log(l+1)/(2500*Math.atan(u));a=d*p},tilt:d=>{c=d*5e-4,h=!1}},{view:d=>{if(!d||d!=null&&d.isIdentity)return T.lookAt(o,r,i);const p=C.fromPoints(o,r).scale(1-a);p.length>2&&p.length<500&&(o=r.add(p));const v=C.fromPoints(r,o),m=T.move(v).apply(f),V=[Math.tan(n[0])*l,Math.tan(n[1])*l],_=C.fromValues(V[0],V[1],0).absolute(m),x=m.relative(o);let w=m.relative(i);w=T.rotationZ(c).apply(w);const y=T.rotationX(-s[1]).compose(T.rotationY(-s[0]));o=y.apply(x).absolute(m),i=y.apply(w).absolute(m);const b=T.move(_);return r=b.apply(r),o=b.apply(o),f=Ct.lookAt(o,r,i),h||(s=[s[0]*.95,s[1]*.95],c*=.9,a*=.9,Math.abs(s[0])<.001&&Math.abs(s[1])<.001&&Math.abs(c)<.001&&Math.abs(a)<.001&&(s=[0,0],c=0,a=0)),n=[0,0],l=C.fromPoints(o,r).length,f.toTransform()},projection:d=>{const p=e.canvas.width/e.canvas.height,v=C.fromPoints(o,r).length,m=Math.max(400,v*.8);return T.perspective(u,p,Math.max(.01,v-m),v+m)}}]},dr=e=>{const t=-N(9),r=g.fromValues(28,0,0),o=g.fromValues(-8,0,-1);e.setAmbientLight([.01,.01,.01,.01]);const i=M.fromVector(g.origin().subtract(r));return e.setLight("directional",0,{dir:i,col:[.55,.55,.5,.5]}),e.setLight("directional",1,{dir:M.fromValues(0,0,1),col:[.6,.6,.6,0]}),e.setLight("point",0,{pos:r,col:[.8,.8,.7,1]}),e.setLight("point",1,{pos:o,col:[.18,.18,.4,.8]}),e.setLight("point",2,{pos:o,col:[.1,.1,.4,0]}),e.setLight("point",3,{pos:o,col:[.1,.1,.4,0]}),{dirLights:(s,n)=>{const a=s/1e3,c=T.rotationZ(t*a);n[0].dir=n[0].dir.map(c)},posLights:(s,n)=>{const a=s/1e3,c=T.rotationZ(t*a),u=T.rotationZ(t*a*1.02);n[0].pos=n[0].pos.map(c),n[1].pos=n[1].pos.map(u)}}};let I=0,Nt=0;const fr=e=>({plane:t=>{const r=t/1e3;return I+=r*N(360/40),{rotation:z.rotationZ(I).rotateY(I/2)}},cone:t=>{const r=t/1e3;return I+=r*N(360/10),{rotation:z.rotationX(I).rotateY(I/2).rotateZ(I/3)}},"earth-clouds":t=>{const r=t/1e3;return Nt-=r*.015,{rotation:z.rotationY(N(23.5)).rotateZ(Nt)}},"earth-sphere":t=>{const r=t/1e3;return I-=r*.022,{rotation:z.rotationY(N(23.5)).rotateZ(I)}},cylinder:t=>{const r=t/1e3;return I+=r*N(360/20),{rotation:z.rotationZ(I).rotateY(I)}},cube:t=>{const r=t/1e3;return I+=r*N(360/10),{rotation:z.rotationZ(I).rotateY(I).rotateZ(I)}}}),K={textures:[],globeTextures:[],showGrid:!1},pr=e=>{const t=It()(T.scale(2.5,2.5,2.48),{id:"earth-sphere",steps:5,colors:[[.3,.4,.7,1]],textureCoordinates:!0});t.addMaterial(e[0]);const r=It()(T.scale(2.53,2.53,2.53),{id:"earth-clouds",steps:4,colors:[[1,1,1,0]],textureCoordinates:!0});return r.addMaterial(e[1]),[t,r]},mr=e=>{const t=tr()(T.scale(3,3,4),{id:"cylinder",steps:36,colors:[[.6,.6,.5,1]],textureCoordinates:!0,textureAlpha:.8});return t.addMaterial(e[0]),[t]},vr=e=>{const t=Qe()(T.scale(2,2,2),{id:"cube",textureCoordinates:!0});return t.addMaterial(e[1]),[t]},gr=e=>{const t=cr()(T.scale(3,3,4).translation(0,0,1),{id:"cone",steps:48,height:.8,textureCoordinates:!0,colors:[[.58,.83,.56,1]],textureAlpha:.8});return t.addMaterial(e[3]),[t]},_r=e=>{const t=nr()(T.scale(4,4,1).rotationY(N(75)),{id:"plane",steps:12,textureCoordinates:!0,colors:[[.4,.4,.4,1]],textureAlpha:1});return t.addMaterial(e[2]),[t]},xr=()=>[ur()(T.scale(180,180,1).translation(0,0,0),{id:"ref-plane",colors:[[.2,.2,.3,.4]],showAxes:!0})];async function yr(e,t){const r=await Oe(e);await r.setupShaders("standard-3d");const[o,i]=hr(r,[6,6,4]);r.captureMouseMotion(o);const s=dr(r),n=fr();r.beginRenderLoop({camera:i,lights:s,models:n});const a=await xr();return r.setScene(a),r}const ut=(e,t)=>()=>{switch(e.getScene().forEach(r=>r.display="none"),e.get("ref-plane")[0].display=K.showGrid?"full":"none",t){case"plane":const r=e.get("plane");if(r.length>0)r.forEach(a=>a.display="full");else{const a=_r(K.textures);e.addToScene(a)}break;case"globe":const o=e.get("earth-sphere","earth-clouds");if(o.length>0)o.forEach(a=>a.display="full");else{const a=pr(K.globeTextures);e.addToScene(a)}break;case"cylinder":const i=e.get("cylinder");if(i.length>0)i.forEach(a=>a.display="full");else{const a=mr(K.textures);e.addToScene(a)}break;case"cone":const s=e.get("cone");if(s.length>0)s.forEach(a=>a.display="full");else{const a=gr(K.textures);e.addToScene(a)}break;case"cube":const n=e.get("cube");if(n.length>0)n.forEach(a=>a.display="full");else{const a=vr(K.textures);e.addToScene(a)}break}},wr=(e,t)=>()=>{console.log("setWireframe",t.checked),t.checked?e.setPipelineMode("alternative"):e.setPipelineMode("default")},Mr=(e,t)=>()=>{console.log("setGrid",t.checked),K.showGrid=t.checked,e.get("ref-plane")[0].display=K.showGrid?"full":"none"},ot=document.getElementById("support"),Ut=document.getElementById("gfx-canvas"),bt=document.getElementById("fps");!ot||!Ut?alert("The app is broken! No canvas was found!"):yr(Ut).then(e=>(ot.innerText="Loading textures...",Gt(e,["earth.jpg","clouds-4k.png"]))).then(([e,t])=>(K.globeTextures.push(...t),ot.innerText="Almost there...",e)).then(e=>Gt(e,["wood-2k.jpg","dice.png","water.jpg","metal.jpg"])).then(([e,t])=>{K.textures.push(...t);const r=document.getElementById("wireframe");r.onclick=wr(e,r);const o=document.getElementById("grid");o.onclick=Mr(e,o);const i=document.getElementById("geo-globe"),s=document.getElementById("geo-cylinder"),n=document.getElementById("geo-cube"),a=document.getElementById("geo-cone"),c=document.getElementById("geo-plane");i.onclick=ut(e,"globe"),s.onclick=ut(e,"cylinder"),n.onclick=ut(e,"cube"),a.onclick=ut(e,"cone"),c.onclick=ut(e,"plane"),i.click(),ot.innerText="All set!",ot.style.opacity="0",bt.style.opacity="1",bt.style.width="160px",setInterval(()=>{ot.style.display="none",bt.innerText=`FPS: ${e.fps.toFixed(0)}`},2e3)}).catch(e=>{ot.innerText="Error: "+e.message});
