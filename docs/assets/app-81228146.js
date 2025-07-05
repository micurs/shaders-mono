(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var te=Object.defineProperty,ee=(e,t,r)=>t in e?te(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,A=(e,t,r)=>(ee(e,typeof t!="symbol"?t+"":t,r),r),mt=1e-6,U=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});function Rt(){var e=new U(9);return U!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function re(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e}function J(){var e=new U(16);return U!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function X(e){var t=new U(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function oe(e,t,r,o,i,s,n,a,c,u,l,d,h,f,p,v){var m=new U(16);return m[0]=e,m[1]=t,m[2]=r,m[3]=o,m[4]=i,m[5]=s,m[6]=n,m[7]=a,m[8]=c,m[9]=u,m[10]=l,m[11]=d,m[12]=h,m[13]=f,m[14]=p,m[15]=v,m}function Tt(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function ie(e,t){if(e===t){var r=t[1],o=t[2],i=t[3],s=t[6],n=t[7],a=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=r,e[6]=t[9],e[7]=t[13],e[8]=o,e[9]=s,e[11]=t[14],e[12]=i,e[13]=n,e[14]=a}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e}function z(e,t){var r=t[0],o=t[1],i=t[2],s=t[3],n=t[4],a=t[5],c=t[6],u=t[7],l=t[8],d=t[9],h=t[10],f=t[11],p=t[12],v=t[13],m=t[14],V=t[15],_=r*a-o*n,y=r*c-i*n,b=r*u-s*n,x=o*c-i*a,M=o*u-s*a,C=i*u-s*c,I=l*v-d*p,D=l*m-h*p,E=l*V-f*p,R=d*m-h*v,k=d*V-f*v,Z=h*V-f*m,L=_*Z-y*k+b*R+x*E-M*D+C*I;return L?(L=1/L,e[0]=(a*Z-c*k+u*R)*L,e[1]=(i*k-o*Z-s*R)*L,e[2]=(v*C-m*M+V*x)*L,e[3]=(h*M-d*C-f*x)*L,e[4]=(c*E-n*Z-u*D)*L,e[5]=(r*Z-i*E+s*D)*L,e[6]=(m*b-p*C-V*y)*L,e[7]=(l*C-h*b+f*y)*L,e[8]=(n*k-a*E+u*I)*L,e[9]=(o*E-r*k-s*I)*L,e[10]=(p*M-v*b+V*_)*L,e[11]=(d*b-l*M-f*_)*L,e[12]=(a*D-n*R-c*I)*L,e[13]=(r*R-o*D+i*I)*L,e[14]=(v*y-p*x-m*_)*L,e[15]=(l*x-d*y+h*_)*L,e):null}function gt(e,t,r){var o=t[0],i=t[1],s=t[2],n=t[3],a=t[4],c=t[5],u=t[6],l=t[7],d=t[8],h=t[9],f=t[10],p=t[11],v=t[12],m=t[13],V=t[14],_=t[15],y=r[0],b=r[1],x=r[2],M=r[3];return e[0]=y*o+b*a+x*d+M*v,e[1]=y*i+b*c+x*h+M*m,e[2]=y*s+b*u+x*f+M*V,e[3]=y*n+b*l+x*p+M*_,y=r[4],b=r[5],x=r[6],M=r[7],e[4]=y*o+b*a+x*d+M*v,e[5]=y*i+b*c+x*h+M*m,e[6]=y*s+b*u+x*f+M*V,e[7]=y*n+b*l+x*p+M*_,y=r[8],b=r[9],x=r[10],M=r[11],e[8]=y*o+b*a+x*d+M*v,e[9]=y*i+b*c+x*h+M*m,e[10]=y*s+b*u+x*f+M*V,e[11]=y*n+b*l+x*p+M*_,y=r[12],b=r[13],x=r[14],M=r[15],e[12]=y*o+b*a+x*d+M*v,e[13]=y*i+b*c+x*h+M*m,e[14]=y*s+b*u+x*f+M*V,e[15]=y*n+b*l+x*p+M*_,e}function at(e,t,r){var o=r[0],i=r[1],s=r[2],n,a,c,u,l,d,h,f,p,v,m,V;return t===e?(e[12]=t[0]*o+t[4]*i+t[8]*s+t[12],e[13]=t[1]*o+t[5]*i+t[9]*s+t[13],e[14]=t[2]*o+t[6]*i+t[10]*s+t[14],e[15]=t[3]*o+t[7]*i+t[11]*s+t[15]):(n=t[0],a=t[1],c=t[2],u=t[3],l=t[4],d=t[5],h=t[6],f=t[7],p=t[8],v=t[9],m=t[10],V=t[11],e[0]=n,e[1]=a,e[2]=c,e[3]=u,e[4]=l,e[5]=d,e[6]=h,e[7]=f,e[8]=p,e[9]=v,e[10]=m,e[11]=V,e[12]=n*o+l*i+p*s+t[12],e[13]=a*o+d*i+v*s+t[13],e[14]=c*o+h*i+m*s+t[14],e[15]=u*o+f*i+V*s+t[15]),e}function se(e,t,r){var o=r[0],i=r[1],s=r[2];return e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e[3]=t[3]*o,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*s,e[9]=t[9]*s,e[10]=t[10]*s,e[11]=t[11]*s,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function kt(e,t,r){var o=Math.sin(r),i=Math.cos(r),s=t[4],n=t[5],a=t[6],c=t[7],u=t[8],l=t[9],d=t[10],h=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=s*i+u*o,e[5]=n*i+l*o,e[6]=a*i+d*o,e[7]=c*i+h*o,e[8]=u*i-s*o,e[9]=l*i-n*o,e[10]=d*i-a*o,e[11]=h*i-c*o,e}function Zt(e,t,r){var o=Math.sin(r),i=Math.cos(r),s=t[0],n=t[1],a=t[2],c=t[3],u=t[8],l=t[9],d=t[10],h=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*i-u*o,e[1]=n*i-l*o,e[2]=a*i-d*o,e[3]=c*i-h*o,e[8]=s*o+u*i,e[9]=n*o+l*i,e[10]=a*o+d*i,e[11]=c*o+h*i,e}function Ot(e,t,r){var o=Math.sin(r),i=Math.cos(r),s=t[0],n=t[1],a=t[2],c=t[3],u=t[4],l=t[5],d=t[6],h=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*i+u*o,e[1]=n*i+l*o,e[2]=a*i+d*o,e[3]=c*i+h*o,e[4]=u*i-s*o,e[5]=l*i-n*o,e[6]=d*i-a*o,e[7]=h*i-c*o,e}function ne(e,t,r){var o=t[0],i=t[1],s=t[2],n=t[3],a=o+o,c=i+i,u=s+s,l=o*a,d=o*c,h=o*u,f=i*c,p=i*u,v=s*u,m=n*a,V=n*c,_=n*u;return e[0]=1-(f+v),e[1]=d+_,e[2]=h-V,e[3]=0,e[4]=d-_,e[5]=1-(l+v),e[6]=p+m,e[7]=0,e[8]=h+V,e[9]=p-m,e[10]=1-(l+f),e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e}function ae(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function ce(e,t){var r=t[0],o=t[1],i=t[2],s=t[4],n=t[5],a=t[6],c=t[8],u=t[9],l=t[10];return e[0]=Math.hypot(r,o,i),e[1]=Math.hypot(s,n,a),e[2]=Math.hypot(c,u,l),e}function le(e,t,r,o){var i=t[0],s=t[1],n=t[2],a=t[3],c=i+i,u=s+s,l=n+n,d=i*c,h=i*u,f=i*l,p=s*u,v=s*l,m=n*l,V=a*c,_=a*u,y=a*l,b=o[0],x=o[1],M=o[2];return e[0]=(1-(p+m))*b,e[1]=(h+y)*b,e[2]=(f-_)*b,e[3]=0,e[4]=(h-y)*x,e[5]=(1-(d+m))*x,e[6]=(v+V)*x,e[7]=0,e[8]=(f+_)*M,e[9]=(v-V)*M,e[10]=(1-(d+p))*M,e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e}function ue(e,t){var r=t[0],o=t[1],i=t[2],s=t[3],n=r+r,a=o+o,c=i+i,u=r*n,l=o*n,d=o*a,h=i*n,f=i*a,p=i*c,v=s*n,m=s*a,V=s*c;return e[0]=1-d-p,e[1]=l+V,e[2]=h-m,e[3]=0,e[4]=l-V,e[5]=1-u-p,e[6]=f+v,e[7]=0,e[8]=h+m,e[9]=f-v,e[10]=1-u-d,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function he(e,t,r,o,i){var s=1/Math.tan(t/2),n;return e[0]=s/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0?(n=1/(o-i),e[10]=(i+o)*n,e[14]=2*i*o*n):(e[10]=-1,e[14]=-2*o),e}var de=he;function qt(e,t,r,o){var i,s,n,a,c,u,l,d,h,f,p=t[0],v=t[1],m=t[2],V=o[0],_=o[1],y=o[2],b=r[0],x=r[1],M=r[2];return Math.abs(p-b)<mt&&Math.abs(v-x)<mt&&Math.abs(m-M)<mt?Tt(e):(l=p-b,d=v-x,h=m-M,f=1/Math.hypot(l,d,h),l*=f,d*=f,h*=f,i=_*h-y*d,s=y*l-V*h,n=V*d-_*l,f=Math.hypot(i,s,n),f?(f=1/f,i*=f,s*=f,n*=f):(i=0,s=0,n=0),a=d*n-h*s,c=h*i-l*n,u=l*s-d*i,f=Math.hypot(a,c,u),f?(f=1/f,a*=f,c*=f,u*=f):(a=0,c=0,u=0),e[0]=i,e[1]=a,e[2]=l,e[3]=0,e[4]=s,e[5]=c,e[6]=d,e[7]=0,e[8]=n,e[9]=u,e[10]=h,e[11]=0,e[12]=-(i*p+s*v+n*m),e[13]=-(a*p+c*v+u*m),e[14]=-(l*p+d*v+h*m),e[15]=1,e)}function ot(){var e=new U(3);return U!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function fe(e){var t=e[0],r=e[1],o=e[2];return Math.hypot(t,r,o)}function ft(e,t,r){var o=new U(3);return o[0]=e,o[1]=t,o[2]=r,o}function pe(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e}function me(e,t){var r=t[0],o=t[1],i=t[2],s=r*r+o*o+i*i;return s>0&&(s=1/Math.sqrt(s)),e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s,e}function Lt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function ct(e,t,r){var o=t[0],i=t[1],s=t[2],n=r[0],a=r[1],c=r[2];return e[0]=i*c-s*a,e[1]=s*n-o*c,e[2]=o*a-i*n,e}var ve=fe;(function(){var e=ot();return function(t,r,o,i,s,n){var a,c;for(r||(r=3),o||(o=0),i?c=Math.min(i*r+o,t.length):c=t.length,a=o;a<c;a+=r)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],s(e,e,n),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2];return t}})();function $t(){var e=new U(4);return U!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function ge(e){var t=new U(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function F(e,t,r,o){var i=new U(4);return i[0]=e,i[1]=t,i[2]=r,i[3]=o,i}function Yt(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e}function Ht(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e}function _e(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e[3]=t[3]*r[3],e}function ye(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e}function xe(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e}function rt(e,t){var r=t[0],o=t[1],i=t[2],s=t[3],n=r*r+o*o+i*i+s*s;return n>0&&(n=1/Math.sqrt(n)),e[0]=r*n,e[1]=o*n,e[2]=i*n,e[3]=s*n,e}function Y(e,t,r){var o=t[0],i=t[1],s=t[2],n=t[3];return e[0]=r[0]*o+r[4]*i+r[8]*s+r[12]*n,e[1]=r[1]*o+r[5]*i+r[9]*s+r[13]*n,e[2]=r[2]*o+r[6]*i+r[10]*s+r[14]*n,e[3]=r[3]*o+r[7]*i+r[11]*s+r[15]*n,e}(function(){var e=$t();return function(t,r,o,i,s,n){var a,c;for(r||(r=4),o||(o=0),i?c=Math.min(i*r+o,t.length):c=t.length,a=o;a<c;a+=r)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],e[3]=t[a+3],s(e,e,n),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2],t[a+3]=e[3];return t}})();function _t(){var e=new U(4);return U!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function we(e,t,r){r=r*.5;var o=Math.sin(r);return e[0]=o*t[0],e[1]=o*t[1],e[2]=o*t[2],e[3]=Math.cos(r),e}function be(e,t,r){var o=t[0],i=t[1],s=t[2],n=t[3],a=r[0],c=r[1],u=r[2],l=r[3];return e[0]=o*l+n*a+i*u-s*c,e[1]=i*l+n*c+s*a-o*u,e[2]=s*l+n*u+o*c-i*a,e[3]=n*l-o*a-i*c-s*u,e}function Me(e,t,r){r*=.5;var o=t[0],i=t[1],s=t[2],n=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c+n*a,e[1]=i*c+s*a,e[2]=s*c-i*a,e[3]=n*c-o*a,e}function Ve(e,t,r){r*=.5;var o=t[0],i=t[1],s=t[2],n=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c-s*a,e[1]=i*c+n*a,e[2]=s*c+o*a,e[3]=n*c-i*a,e}function Te(e,t,r){r*=.5;var o=t[0],i=t[1],s=t[2],n=t[3],a=Math.sin(r),c=Math.cos(r);return e[0]=o*c+i*a,e[1]=i*c-o*a,e[2]=s*c+n*a,e[3]=n*c-s*a,e}function xt(e,t,r,o){var i=t[0],s=t[1],n=t[2],a=t[3],c=r[0],u=r[1],l=r[2],d=r[3],h,f,p,v,m;return f=i*c+s*u+n*l+a*d,f<0&&(f=-f,c=-c,u=-u,l=-l,d=-d),1-f>mt?(h=Math.acos(f),p=Math.sin(h),v=Math.sin((1-o)*h)/p,m=Math.sin(o*h)/p):(v=1-o,m=o),e[0]=v*i+m*c,e[1]=v*s+m*u,e[2]=v*n+m*l,e[3]=v*a+m*d,e}function et(e,t){var r=t[0],o=t[1],i=t[2],s=t[3],n=r*r+o*o+i*i+s*s,a=n?1/n:0;return e[0]=-r*a,e[1]=-o*a,e[2]=-i*a,e[3]=s*a,e}function jt(e,t){var r=t[0]+t[4]+t[8],o;if(r>0)o=Math.sqrt(r+1),e[3]=.5*o,o=.5/o,e[0]=(t[5]-t[7])*o,e[1]=(t[6]-t[2])*o,e[2]=(t[1]-t[3])*o;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var s=(i+1)%3,n=(i+2)%3;o=Math.sqrt(t[i*3+i]-t[s*3+s]-t[n*3+n]+1),e[i]=.5*o,o=.5/o,e[3]=(t[s*3+n]-t[n*3+s])*o,e[s]=(t[s*3+i]+t[i*3+s])*o,e[n]=(t[n*3+i]+t[i*3+n])*o}return e}var pt=ge,Pe=F,Wt=rt;(function(){var e=ot(),t=ft(1,0,0),r=ft(0,1,0);return function(o,i,s){var n=Lt(i,s);return n<-.999999?(ct(e,t,i),ve(e)<1e-6&&ct(e,r,i),me(e,e),we(o,e,Math.PI),o):n>.999999?(o[0]=0,o[1]=0,o[2]=0,o[3]=1,o):(ct(e,i,s),o[0]=e[0],o[1]=e[1],o[2]=e[2],o[3]=1+n,Wt(o,o))}})();(function(){var e=_t(),t=_t();return function(r,o,i,s,n,a){return xt(e,o,n,a),xt(t,i,s,a),xt(r,e,t,2*a*(1-a)),r}})();(function(){var e=Rt();return function(t,r,o,i){return e[0]=o[0],e[3]=o[1],e[6]=o[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],Wt(t,jt(t,e))}})();const vt=class ${constructor(){A(this,"_coord"),A(this,"scale",t=>{const r=new $;return ye(r._coord,this._coord,t),r}),A(this,"dot",t=>Lt(this.vec3(),t.vec3())),A(this,"crossProduct",t=>{const r=ot();return ct(r,this.vec3(),t.vec3()),$.fromVec3(r)}),A(this,"add",t=>{const r=new $;return Yt(r._coord,this._coord,t._coord),r}),A(this,"multiply",t=>{const r=new $;return _e(r._coord,this._coord,t._coord),r}),this._coord=F(0,0,0,0)}static get bufferSize(){return 4*4}static fromValues(t,r,o){const i=new $;return i._coord=F(t,r,o,0),i}static fromVec4(t){const r=new $,o=t[3]!==0?t[3]:1;return r._coord=F(t[0]/o,t[1]/o,t[2]/o,0),r}static fromVec3(t){const r=new $;return r._coord=F(t[0],t[1],t[2],0),r}static fromPoints(t,r){const o=new $;return Ht(o._coord,t.vec4(),r.vec4()),o}static fromPoint(t){const r=new $;return r._coord=[...t.triplet,0],r}toString(){return`Vector(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new $;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),r}unMap(t){const r=new $;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}isUnitVector(){return!1}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get triplet(){return[this.x,this.y,this.z]}get coordinates(){return[...this._coord.values()]}buffer(){return new Float32Array(this.coordinates)}get length(){const t=this._coord[0],r=this._coord[1],o=this._coord[2];return Math.sqrt(t*t+r*r+o*o)}get lengthSquare(){const t=this._coord[0],r=this._coord[1],o=this._coord[2];return t*t+r*r+o*o}vec3(){return ft(this.x,this.y,this.z)}vec4(){return F(this.x,this.y,this.z,0)}};A(vt,"crossProduct",(e,t)=>{const r=ot();return ct(r,e.vec3(),t.vec3()),vt.fromVec3(r)}),A(vt,"dot",(e,t)=>Lt(e.vec3(),t.vec3()));let S=vt;class g{constructor(){A(this,"_coord"),this._coord=F(0,0,0,1)}static get bufferSize(){return 4*4}static origin(){return new g}static fromValues(t,r,o,i=1){const s=new g;return s._coord=F(t/i,r/i,o/i,1),s}static fromVector(t){const r=new g;return r._coord=F(t.x,t.y,t.z,1),r}static fromVec4(t){const r=new g,o=t[3]!==0?t[3]:1;return r._coord=F(t[0]/o,t[1]/o,t[2]/o,1),r}static fromVec3(t){const r=new g;return r._coord=F(t[0],t[1],t[2],1),r}toString(){return`Point(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new g;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),r}unMap(t){const r=new g;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}static relative(t,r){return t.map(r)}static absolute(t,r){return t.unMap(r)}subtract(t){const r=$t();return Ht(r,this._coord,t._coord),S.fromVec4(r)}scale(t){const r=ot();return pe(r,this.vec3(),t),g.fromVec3(r)}add(t){const r=new g;return Yt(r._coord,this._coord,t.vec4()),r}isPoint(){return!0}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get coordinates(){return[...this._coord.values()]}get triplet(){return[this.x,this.y,this.z]}buffer(){return new Float32Array(this.coordinates)}vec3(){return ft(this.x,this.y,this.z)}vec4(){return F(this.x,this.y,this.z,1)}}const Pt=class j{constructor(){A(this,"_coord"),this._coord=F(1,1,1,0)}static get bufferSize(){return 4*4}static fromVector(t){const r=new j;return r._coord=F(t.x,t.y,t.z,0),rt(r._coord,r._coord),r}static fromPoints(t,r){const o=new j;return o._coord=F(t.x-r.x,t.y-r.y,t.z-r.z,0),rt(o._coord,o._coord),o}fromPoint(t){return j.fromValues(...t.triplet)}static fromValues(t,r,o){const i=F(t,r,o,0);return rt(i,i),j.fromVec4(i)}static fromVec4(t){const r=new j,o=t[3]!==0?t[3]:1;return r._coord=F(t[0]/o,t[1]/o,t[2]/o,0),rt(r._coord,r._coord),r}static fromVec3(t){const r=new j;return r._coord=F(t[0],t[1],t[2],0),rt(r._coord,r._coord),r}toString(){return`UnitVector(${this.x}, ${this.y}, ${this.z})`}map(t){const r=new j;return t.isFrame()?Y(r._coord,this._coord,t.inverseMatrix):Y(r._coord,this._coord,t.directMatrix),rt(r._coord,r._coord),r}unMap(t){const r=new j;return t.isFrame()?Y(r._coord,this._coord,t.directMatrix):Y(r._coord,this._coord,t.inverseMatrix),rt(r._coord,r._coord),r}relative(t){return this.map(t)}absolute(t){return this.unMap(t)}invert(){const t=new j;return xe(t._coord,this._coord),t}scale(t){return S.fromValues(this.x*t,this.y*t,this.z*t)}add(t){return S.fromValues(this.x+t.x,this.y+t.y,this.z+t.z)}isUnitVector(){return!0}get x(){return this._coord[0]}get y(){return this._coord[1]}get z(){return this._coord[2]}get length(){return 1}get coordinates(){return[...this._coord.values()]}get triplet(){return[this.x,this.y,this.z]}crossProduct(t){return S.fromVec3(this.triplet).crossProduct(t)}buffer(){return new Float32Array(this.coordinates)}vec3(){return ft(this.x,this.y,this.z)}};A(Pt,"crossProduct",(e,t)=>{const r=ot();return ct(r,e.vec3(),t.vec3()),Pt.fromVec3(r)});let w=Pt;const At=e=>e.isUnitVector();class T{constructor(){A(this,"_direct"),A(this,"_inverse"),A(this,"_isIdentity",!0),this._direct=J(),this._inverse=J(),z(this._inverse,this._direct)}static get bufferSize(){return 16*4}static world(){return new T}static identity(){return new T}static fromRotation(t){const r=new T;return ue(r._direct,t.quat),z(r._inverse,r._direct),r._isIdentity=!1,r}static fromMat4(t){const r=new T,o=J();return z(o,t),r._direct=X(t),r._inverse=X(o),r._isIdentity=!1,r}static lookAt(t,r,o){const i=new T;return qt(i._direct,t.vec3(),r.vec3(),o.vec3()),z(i._inverse,i._direct),i._isIdentity=!1,i}static perspective(t,r,o,i){const s=new T;return de(s._direct,t,r,o,i),z(s._inverse,s._direct),s._isIdentity=!1,s}static invert(t){const r=new T;return r._direct=X(t._inverse),r._inverse=X(t._direct),r._isIdentity=!1,r}static translation(t,r,o){const i=new T;return at(i._direct,i._direct,[t,r,o]),z(i._inverse,i._direct),i._isIdentity=!1,i}static move(t){const r=new T;return at(r._direct,r._direct,t.vec3()),z(r._inverse,r._direct),r._isIdentity=!1,r}static rotationX(t){const r=new T;return kt(r._direct,r._direct,t),z(r._inverse,r._direct),r._isIdentity=!1,r}static rotationY(t){const r=new T;return Zt(r._direct,r._direct,t),z(r._inverse,r._direct),r._isIdentity=!1,r}static rotationZ(t){const r=new T;return Ot(r._direct,r._direct,t),z(r._inverse,r._direct),r._isIdentity=!1,r}static scale(t,r,o){const i=new T;return se(i._direct,i._direct,[t,r,o]),z(i._inverse,i._direct),i._isIdentity=!1,i}static rotoTranslation(t,r){const o=new T;return ne(o._direct,t.quat,r.vec3()),z(o._inverse,o._direct),o._isIdentity=!1,o}static fromRotationTranslationScale(t,r,o){const i=new T;return le(i._direct,t.quat,r.vec3(),o.vec3()),z(i._inverse,i._direct),i._isIdentity=!1,i}isFrame(){return!1}get values(){return this._direct.values()}get inverseValues(){return this._inverse.values()}buffer(){return new Float32Array(this._direct.values())}inverseBuffer(){return new Float32Array(this._inverse.values())}apply(t){return t.map(this)}compose(t){const r=new T,{_direct:o,_inverse:i}=this,{_direct:s,_inverse:n}=t;return gt(r._direct,s,o),gt(r._inverse,i,n),r._isIdentity=!1,r}transpose(){const t=new T;return ie(t._direct,this._direct),z(t._inverse,t._direct),t._isIdentity=!1,t}translation(t,r,o){const i=T.translation(t,r,o);return this.compose(i)}rotationX(t){const r=T.rotationX(t);return this.compose(r)}rotationY(t){const r=T.rotationY(t);return this.compose(r)}rotationZ(t){const r=T.rotationZ(t);return this.compose(r)}scale(t,r,o){const i=T.scale(t,r,o);return this.compose(i)}invert(){const t=new T;return t._direct=X(this._inverse),t._inverse=X(this._direct),t._isIdentity=this._isIdentity,t}get directMatrix(){return this._direct}get inverseMatrix(){return this._inverse}get isIdentity(){return this._isIdentity}get scaleVector(){const t=ot();return ce(t,this._direct),S.fromValues(t[0],t[1],t[2])}get positionVector(){const t=ot();return ae(t,this._direct),S.fromValues(t[0],t[1],t[2])}}const St=class W{constructor(){A(this,"_direct"),A(this,"_inverse"),this._direct=J(),this._inverse=J(),Tt(this._direct),Tt(this._inverse)}static bufferSize(){return 16*4}static world(){return new W}static translation(t){const r=new W,o=J();return at(o,o,t.vec3()),r._direct=o,z(r._inverse,r._direct),r}static rotationX(t,r){const o=new W,i=J();return at(i,i,t.vec3()),kt(i,i,r),o._direct=i,z(o._inverse,o._direct),o}static rotationY(t,r){const o=new W,i=J();return at(i,i,t.vec3()),Zt(i,i,r),o._direct=i,z(o._inverse,o._direct),o}static rotationZ(t,r){const o=new W,i=J();return at(i,i,t.vec3()),Ot(i,i,r),o._direct=i,z(o._inverse,o._direct),o}static lookAt(t,r,o){const i=new W;return qt(i._inverse,t.vec3(),r.vec3(),o.vec3()),z(i._direct,i._inverse),i}isFrame(){return!0}toString(){return`Frame(${this.origin}, ${this.i}, ${this.j}, ${this.k})`}map(t){return this.compose(t)}unMap(t){return this.compose(t.invert())}compose(t){const r=new W,{_direct:o}=this,{_direct:i}=t;return gt(r._direct,i,o),z(r._inverse,r._direct),r}toTransform(){return T.fromMat4(this._inverse)}invert(){const t=new W;return t._direct=X(this._inverse),t._inverse=X(this._direct),t}get directMatrix(){return X(this._direct)}get inverseMatrix(){return X(this._inverse)}get i(){return w.fromValues(this._direct[0],this._direct[1],this._direct[2])}get j(){return w.fromValues(this._direct[4],this._direct[5],this._direct[6])}get k(){return w.fromValues(this._direct[8],this._direct[9],this._direct[10])}get o(){return g.fromValues(this._direct[12],this._direct[13],this._direct[14],this._direct[15])}get origin(){return g.fromValues(this._inverse[12],this._inverse[13],this._inverse[14],this._inverse[15])}relative(t){if(t&&Se(t)){const r=new W;return gt(r._direct,t.inverseMatrix,this.directMatrix),z(r._inverse,r._direct),r}return t.relative(this)}absolute(t){return t.compose(this)}};A(St,"from2Vectors",(e,t,r)=>{const o=new St,i=At(t)?t:w.fromVector(t),s=w.crossProduct(i,At(r)?r:w.fromVector(r)),n=[...w.crossProduct(s,i).coordinates,...s.coordinates,...i.coordinates,...e.coordinates];return o._direct=oe(...n),z(o._inverse,o._direct),o});let Ct=St;const Se=e=>e&&e.isFrame!==void 0?e.isFrame():!1;let tt=class B{constructor(){A(this,"_direct"),A(this,"_inverse"),this._direct=_t(),this._inverse=_t()}static identity(){return new B}static fromValues(t,r,o,i){const s=new B;return s._direct=Pe(t,r,o,i),et(s._inverse,s._direct),s}static fromAngles(t,r,o){return B.rotationX(t).rotateY(r).rotateZ(o)}static fromQuat(t){const r=new B;return r._direct=pt(t),et(r._inverse,r._direct),r}static fromArray(t){const r=new B;return r._direct=pt(t),et(r._inverse,r._direct),r}static fromTransform(t){const r=Rt();re(r,t.directMatrix);const o=new B;return o._direct=jt(o._direct,r),et(o._inverse,o._direct),o}static rotationX(t){const r=new B;return Me(r._direct,r._direct,t),et(r._inverse,r._direct),r}static rotationY(t){const r=new B;return Ve(r._direct,r._direct,t),et(r._inverse,r._direct),r}static rotationZ(t){const r=new B;return Te(r._direct,r._direct,t),et(r._inverse,r._direct),r}rotateX(t){return this.compose(B.rotationX(t))}rotateY(t){return this.compose(B.rotationY(t))}rotateZ(t){return this.compose(B.rotationZ(t))}inverse(){const t=new B;return t._direct=pt(this._inverse),t._inverse=pt(this._direct),t}compose(t){const r=new B;return be(r._direct,this._direct,t._direct),et(r._inverse,r._direct),r}get quat(){return this._direct}};const N=e=>e/180*Math.PI;var Ce=Object.defineProperty,Le=(e,t,r)=>t in e?Ce(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,P=(e,t,r)=>(Le(e,typeof t!="symbol"?t+"":t,r),r);const It=()=>{let e=0,t=performance.now(),r=0;const o=[];return{getFPS:()=>o.reduce((i,s)=>i+s,0)/o.length,measureFPS:()=>{const i=performance.now();return e=i-t,e<=1?o[r]:(r=(r+1)%10,o[r]=1e3/e,t=i,e)},getLastTimeSpan:()=>e}},ze=async({device:e},t)=>{const r=e.createShaderModule({code:t});return(await r.getCompilationInfo()).messages.forEach(o=>{let i=o.message;o.lineNum&&(i=`Line ${o.lineNum}:${o.linePos} - "${t.substr(o.offset,o.length+40)}"
`+o.message),console.error("WGSL error: ",i)}),r},Ae=e=>{const t=3*T.bufferSize+8+4*(2*S.bufferSize)+4*(S.bufferSize+g.bufferSize),r=4,o=r*(2*S.bufferSize)+r*(S.bufferSize+g.bufferSize)+4*4+2*4,i=e.device.createBuffer({label:"TransBuffer",size:t+t%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s=e.device.createBuffer({label:"LightBuffer",size:o+o%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),n=[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],a=e.device.createBindGroupLayout({label:"transformations",entries:n}),c=[{binding:0,resource:{buffer:i}},{binding:1,resource:{buffer:s}}],u=e.device.createBindGroup({label:"SceneData",layout:a,entries:c});return[a,u,[i,s]]},Ie=e=>{const t=2*T.bufferSize,r=e.device.createBuffer({label:"TransBuffer",size:t+t%16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],i=e.device.createBindGroupLayout({label:"modelTransf",entries:o}),s=[{binding:0,resource:{buffer:r}}],n=e.device.createBindGroup({label:"SceneData",layout:i,entries:s});return[i,n,[r]]},De=e=>{const t=e.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),r=e.device.createBuffer({size:2*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],i=e.device.createBindGroupLayout({label:"color",entries:o}),s=[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:r}}],n=e.device.createBindGroup({label:"color",layout:i,entries:s});return[i,n,[t,r]]},Fe=(e,t)=>{const{device:r}=e,o={addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",maxAnisotropy:1},i=r.createSampler(o),s=t.map(l=>l.view),n=[...s.map((l,d)=>({binding:d,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}})),{binding:4,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}}],a=e.device.createBindGroupLayout({label:"texture",entries:n}),c=[...s.map((l,d)=>({binding:d,resource:l})),{binding:4,resource:i}],u=e.device.createBindGroup({label:"texture",layout:a,entries:c});return[a,u]},Ge=(e,t)=>{const{device:r}=e,[o,i,s]=Ae(e),[n,a,c]=De(e),[u,l,d]=Ie(e),[h,f]=t.length>0?Fe(e,t):[void 0,void 0],p=h?[o,n,u,h]:[o,n,u],v={sceneGroup:i,colorGroup:a,modelGroup:l,texturesGroup:f},m={sceneBuffers:s,colorBuffers:c,modelBuffers:d};return[r.createPipelineLayout({bindGroupLayouts:p}),v,m]},Dt=(e,t,r)=>{const{device:o,format:i}=e,s=r.map(n=>{const[a,c,u]=Ge(e,n.materials),l={label:n.label,layout:a,multisample:{count:1},vertex:{module:t,entryPoint:n.vertexShader,buffers:[n.bufferLayout]},fragment:{module:t,entryPoint:n.fragmentShader,targets:[{format:i,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:n.primitives,cullMode:n.cullMode},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}},d=o.createRenderPipeline(l),h={...l,label:`${n.label}-alt`,primitive:{topology:n.primitives==="line-list"?n.primitives:"line-strip",cullMode:"none"}},f=o.createRenderPipeline(h);return[n.id,{id:n.id,type:n.label,pipeline:d,altPipeline:f,geoRenderable:n,uniformBuffers:u,bindGroups:c}]});return new Map(s)},Be=(e,t)=>{let r="none",o=[0,0],i=[0,0],s=[0,0];e.addEventListener("contextmenu",n=>{n.preventDefault()}),e.addEventListener("wheel",n=>{n.ctrlKey?t.tilt(n.deltaY):t.zoom(n.deltaY)}),e.addEventListener("pointerdown",n=>{e.setPointerCapture(n.pointerId),o=[n.offsetX,n.offsetY],i=[0,0],s=o,r=`${n.ctrlKey?"ctrl-":""}mouse-${n.button}`,t.move(r,{origin:o,direction:i},s)}),e.addEventListener("pointermove",n=>{if(r==="none")return;const a=[n.offsetX,n.offsetY];i=[a[0]-s[0],a[1]-s[1]],s=a,t.move(r,{origin:o,direction:i},s)}),e.addEventListener("pointerup",n=>{e.releasePointerCapture(n.pointerId);const a=[n.offsetX,n.offsetY];i=[a[0]-o[0],a[1]-o[1]],i[0]<=.9&&i[1]<=.9&&t.click("none",a),t.move("none",{origin:o,direction:i},a),r="none"})},Ne=(e,t,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const o=e.createBuffer({size:t.byteLength,usage:r,mappedAtCreation:!0});return new Float32Array(o.getMappedRange()).set(t),o.unmap(),o},Ft=(e,t,r)=>{const{canvas:o}=e,i=He(window.getComputedStyle(o).backgroundColor);return{colorAttachments:[{view:t,clearValue:i,loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:r,depthClearValue:1,depthStoreOp:"store",depthLoadOp:"clear"}}},Ue=async e=>{const t=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!t)throw new Error("WebGPU:adapter is NOT available!");const r=await t.requestDevice();if(!r)throw new Error("WebGPU:device is NOT available!");const o=e.getContext("webgpu");if(!o)throw new Error("WebGPU:context from instantiated Canvas not available!");const i=navigator.gpu.getPreferredCanvasFormat();return o.configure({device:r,format:i,usage:GPUTextureUsage.RENDER_ATTACHMENT,alphaMode:"opaque"}),console.info("WegGPU: maxBindGroups:",r.limits.maxBindGroups),{context:o,device:r,canvas:e,format:i}},Ee=e=>typeof e=="string",Re=(e,[t,r],o)=>({view:o&&o.view?o.view(e.view):T.lookAt(g.fromValues(-5,-5,-5),g.fromValues(0,0,0),w.fromValues(0,0,1)),projection:o&&o.projection?o.projection(e.projection):T.perspective(Math.PI/5,t/r,.1,100)}),ke=e=>e!=null,Ze=`const MAX_DIR_LIGHTS: u32 = 4;
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
  let tangentSpaceNormal = vec3<f32>(deltaVector.x * materialProperties.bumpIntensity, deltaVector.y * materialProperties.bumpIntensity, 1.0);
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
`,Oe="",qe=e=>{const{canvas:t,context:r,device:o}=e;let[i,s]=[t.width,t.height];return new ResizeObserver(n=>{const{width:a,height:c}=n[0].contentRect;[i,s]=[Math.round(a),Math.round(c)]}).observe(t.parentElement),n=>{var a,c;if(i===t.width&&s===t.height){const d=r.getCurrentTexture(),h=n.colorAttachments;return h[0].view=d.createView({label:"ColorView"}),n}t.width=i,t.height=s,(a=e._colorTexture)==null||a.destroy(),(c=e._depthTexture)==null||c.destroy(),e._depthTexture=o.createTexture({label:"DepthTexture",sampleCount:1,size:[i,s,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),e._colorTexture=o.createTexture({label:"ColorTexture",size:{width:i,height:s,depthOrArrayLayers:1},sampleCount:1,format:e.format,usage:GPUTextureUsage.RENDER_ATTACHMENT});const u=n.colorAttachments;u[0].view=e._colorTexture.createView({label:"ColorView"});const l=n.depthStencilAttachment;return l.view=e._depthTexture.createView({label:"DepthView"}),n}};class zt{constructor(t,r,o,i){P(this,"canvas"),P(this,"context"),P(this,"device"),P(this,"format"),P(this,"_handleOnRender"),P(this,"_vertexCount",0),P(this,"_activeRenderLoop",!1),P(this,"_pipelineMode","default"),P(this,"_shaderModule"),P(this,"_pipelines",new Map),P(this,"_transformations",{projection:T.identity(),view:T.identity()}),P(this,"_cameraTransHandler"),P(this,"_lightsHandler"),P(this,"_modelHandlers",{}),P(this,"_fps",It()),P(this,"_rebuildViewTexture"),P(this,"_colorTexture"),P(this,"_depthTexture"),P(this,"_ambientLight",[.3,.3,.3,1]),P(this,"_dirLights",[{dir:w.fromValues(0,0,1),col:[.4,.4,.4,0]},{dir:w.fromValues(1,1,1),col:[.4,.3,.3,0]},{dir:w.fromValues(1,0,0),col:[.5,.5,.5,0]},{dir:w.fromValues(-1,-1,-1),col:[.3,.3,.3,0]}]),P(this,"_pointLights",[{pos:g.fromValues(-12,12,8),col:[.5,.5,.2,0]},{pos:g.fromValues(12,12,8),col:[.4,.2,.2,0]},{pos:g.fromValues(-12,-12,8),col:[.2,.2,.5,0]},{pos:g.fromValues(12,-12,8),col:[.5,.1,.5,0]}]),P(this,"render",()=>{const{device:s}=this;this._vertexCount=0,this._handleOnRender&&this._handleOnRender(this);let n=Ft(this,this._colorTexture.createView(),this._depthTexture.createView());this._rebuildViewTexture&&(n=this._rebuildViewTexture(n));const a=s.createCommandEncoder(),c=a.beginRenderPass(n),u=this._fps.getLastTimeSpan();this.updateLights(u),this.pipelines.filter(({geoRenderable:l})=>l.colors[0][3]===1).forEach((l,d)=>{this.renderPipeline(l,d,c,u)}),this.pipelines.filter(({geoRenderable:l})=>l.colors[0][3]<1).forEach((l,d)=>{this.renderPipeline(l,d,c,u)}),c.end(),s.queue.submit([a.finish()])}),this.canvas=t,this.context=r,this.device=o,this.format=i,this._rebuildViewTexture=qe(this),this._colorTexture=o.createTexture({size:{width:t.width,height:t.height,depthOrArrayLayers:1},sampleCount:1,format:this.format,usage:GPUTextureUsage.RENDER_ATTACHMENT}),this._depthTexture=o.createTexture({label:"DepthTexture",sampleCount:1,size:[t.width,t.height,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.device.lost.then(()=>{console.log("WebGPU:device lost")})}get vertexCount(){return this._vertexCount}get fps(){return this._fps.getFPS()}get dirLights(){return this._dirLights}get pontLights(){return this._pointLights}get(...t){return t.map(r=>this._pipelines.get(r)).filter(ke).map(r=>r.geoRenderable)}setAmbientLight(t){this._ambientLight=t}setLight(t,r,o){switch(t){case"directional":this._dirLights[r]=o;break;case"point":this._pointLights[r]=o;break}}static async build(t){return Ue(t).then(({canvas:r,context:o,device:i,format:s})=>new zt(r,o,i,s))}setPipelineMode(t){this._pipelineMode=t}get pipelines(){return[...this._pipelines.values()]}getScene(){return[...this._pipelines.values()].map(({geoRenderable:t})=>t)}async setupShaders(t){if(this._shaderModule)return this;let r;if(Ee(t))switch(t){case"standard-3d":r=Ze;break;case"standard-2d":default:r=Oe;break}else r=t.source;return this._shaderModule=await ze(this,r),this}setScene(t){if(!this._shaderModule)throw new Error("WebGPU:shader module is NOT available!");t.forEach(r=>{r.buildGpuBuffer(this)}),this._pipelines=Dt(this,this._shaderModule,t),Ft(this,this._colorTexture.createView(),this._depthTexture.createView())}addToScene(t){if(!this._shaderModule)throw new Error("WebGPU:shader module is NOT available!");t.forEach(r=>{r.buildGpuBuffer(this)}),Dt(this,this._shaderModule,t).forEach((r,o)=>{this._pipelines.set(o,r)})}removeFromScene(t){return this._pipelines.delete(t)}clearScene(){this._pipelines.clear()}captureMouseMotion(t){Be(this.canvas,{move:(t==null?void 0:t.move)??((r,o,i)=>{}),click:(t==null?void 0:t.click)??((r,o)=>{}),zoom:(t==null?void 0:t.zoom)??(r=>{}),tilt:(t==null?void 0:t.tilt)??(r=>{})})}sceneIntoBuffer(t){const{device:r}=this,{projection:o,view:i}=this._transformations,s=i.invert();let n=0;r.queue.writeBuffer(t[0],n,i.buffer()),n+=T.bufferSize,r.queue.writeBuffer(t[0],n,s.buffer()),n+=T.bufferSize,r.queue.writeBuffer(t[0],n,o.buffer()),n+=T.bufferSize;let a=0;const c=new Float32Array(this._dirLights.flatMap(({dir:d,col:h})=>[...d.coordinates,...h]));r.queue.writeBuffer(t[1],a,c),a+=c.byteLength;const u=new Float32Array(this._pointLights.flatMap(({pos:d,col:h})=>[...d.coordinates,...h]));r.queue.writeBuffer(t[1],a,u),a+=u.byteLength;const l=new Float32Array(this._ambientLight);r.queue.writeBuffer(t[1],a,l),a+=l.byteLength,r.queue.writeBuffer(t[1],a,new Uint32Array([this._dirLights.length,this._pointLights.length]))}updateLights(t){if(!this._lightsHandler)return;const{dirLights:r,posLights:o}=this._lightsHandler;r&&r(t,this._dirLights),o&&o(t,this._pointLights)}onRender(t){this._handleOnRender=t}renderPipeline(t,r,o,i){const{pipeline:s,altPipeline:n,uniformBuffers:a,bindGroups:c,geoRenderable:u}=t,{device:l}=this;if(r===0&&(this.sceneIntoBuffer(a.sceneBuffers),o.setBindGroup(0,c.sceneGroup)),u.display==="none")return;const d=this._pipelineMode==="default"?s:n;o.setPipeline(d),this._modelHandlers[u.id]&&u.transform(i,this._modelHandlers[u.id]),l.queue.writeBuffer(a.modelBuffers[0],0,u.transformationData),o.setBindGroup(2,c.modelGroup),c.texturesGroup&&o.setBindGroup(3,c.texturesGroup),u.buffers.forEach((h,f)=>{const p=new Float32Array(u.colors[f]);l.queue.writeBuffer(a.colorBuffers[0],0,p),l.queue.writeBuffer(a.colorBuffers[1],0,new Float32Array([u.materialProperties.alpha,u.materialProperties.bumpIntensity])),o.setBindGroup(1,c.colorGroup);const v=u.getVertexCountPerStrip(f);this._vertexCount+=v,o.setVertexBuffer(0,h),o.draw(v)})}renderLoop(){const{width:t,height:r}=this.canvas;this._transformations=Re(this._transformations,[t,r],this._cameraTransHandler),this.render(),this._fps.measureFPS(),this._activeRenderLoop&&requestAnimationFrame(this.renderLoop.bind(this))}beginRenderLoop(t){this._fps=It(),this._cameraTransHandler=t==null?void 0:t.camera,this._lightsHandler=t==null?void 0:t.lights,this._modelHandlers=(t==null?void 0:t.models)??{},this._activeRenderLoop=!0,this.renderLoop()}setLightsHandler(t){this._lightsHandler=t}endRenderLoop(){this._activeRenderLoop=!1}}let ut=new Map;const $e=async e=>{var t,r;if(!navigator.gpu)return Promise.reject(new Error("WebGPU is not supported in this browser!"));const o=(t=ut.get(e.id))==null?void 0:t.gpu;if(o)return Promise.resolve(o);if((r=ut.get(e.id))!=null&&r.initializing)return new Promise((s,n)=>{setTimeout(()=>{var a;const c=(a=ut.get(e.id))==null?void 0:a.gpu;if(c)return console.warn("WebGPU connection already initialized. Reusing previous connection."),s(c);n(new Error("WebGPU already initialization is taking too long!"))},100)});ut.set(e.id,{initializing:!0});const i=await zt.build(e);return ut.set(e.id,{initializing:!1,gpu:i}),Promise.resolve(i)},Ye=(e,t,r)=>{const{device:o}=e,i="rgba8unorm",s={label:t,size:[r.width,r.height,1],format:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT},n=o.createTexture(s);o.queue.copyExternalImageToTexture({source:r},{texture:n},[r.width,r.height]);const a=n.createView({label:`${t}-view`});return{name:t,texture:n,view:a}},He=e=>{let t=[];const r=/rgba?\(([^)]+)\)/.exec(e);if(r&&r[1]&&(t=r[1].split(",").map(a=>parseFloat(a.trim()))),t.length<3)throw new Error("Invalid RGB/RGBA format");const o=t[0]/255,i=t[1]/255,s=t[2]/255,n=t.length===4?t[3]:1;return{r:o,g:i,b:s,a:n}},je=async(e,t)=>{const r=new URL(t,window.location.href);return new Promise((o,i)=>{const s=new Image;s.src=r.href,s.onerror=n=>{i(n)},s.onload=()=>{createImageBitmap(s).then(n=>Ye(e,r.pathname,n)).then(n=>o([e,n]))}})},Gt=async(e,t)=>Promise.all(t.map(r=>je(e,r))).then(r=>Promise.resolve([e,r.map(([,o])=>o)])),H=4;class lt{constructor(t,r,o){P(this,"_body",null),P(this,"_id"),P(this,"_bufferData",null),P(this,"_vertices",[]),P(this,"_vertexColors",[]),P(this,"_vertexNormals",[]),P(this,"_vertexTangents",[]),P(this,"_vertexTextureCoords",[]),P(this,"_stripColors",[]),P(this,"_vertexByteSize",0),P(this,"_buffers",[]),P(this,"_bufferLayout",null),P(this,"_topology","triangle-list"),P(this,"_cullMode","back"),P(this,"_alpha",1),P(this,"_bumpIntensity",.2),P(this,"_materials",[]),P(this,"_transformation",{rotation:tt.identity(),scale:S.fromValues(1,1,1),translation:S.fromValues(0,0,0)}),P(this,"_transformationData"),P(this,"display","full"),this._id=t,this._topology=r,this._vertexByteSize=3*4,this._stripColors=o.colors??[[0,0,0,0]],this._alpha=o.alpha??1,this._bumpIntensity=o.bumpIntensity??.2,this._transformationData=new Float32Array(32)}get id(){return this._id}get materialProperties(){return{alpha:this._alpha,bumpIntensity:this._bumpIntensity}}get label(){return this._topology}get translationVector(){return this._transformation.translation??S.fromValues(0,0,0)}get orientationRotation(){return this._transformation.rotation??tt.identity()}get scaleVector(){return this._transformation.scale??S.fromValues(1,1,1)}get hasTextures(){return this._vertexTextureCoords.length>0&&this._materials.length>0}get materials(){return this._materials}get vertexShader(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this.hasTextures?"vertexTextureShader":"vertexColorShader":"vertexLineShader"}get fragmentShader(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this._materials.length==2?"fragmentTextureBumpShader":this.hasTextures?"fragmentTextureShader":"fragmentColorShader":"fragmentLineShader"}get colors(){return this._stripColors}get primitives(){return this._topology}get cullMode(){return this._topology==="triangle-strip"||this._topology==="triangle-list"?this._cullMode:"none"}get vertexCount(){return this._vertices.reduce((t,r)=>t+r.length/3,0)}get body(){return this._body}get transformation(){return T.fromRotationTranslationScale(this._transformation.rotation??tt.identity(),this._transformation.translation??S.fromValues(0,0,0),this._transformation.scale??S.fromValues(1,1,1))}get transformationData(){const t=this.transformation;return this._transformationData.set([...t.values]),this._transformationData.set([...t.transpose().invert().values],16),this._transformationData}addMaterial(t){return this._materials.push(t),this.materials.length-1}setBody(t){return this._body=t,this}scale(t){return this._transformation.scale=this.scaleVector.multiply(t),this}translate(t){return this._transformation.translation=this.translationVector.add(t),this}rotate(t){return this._transformation.rotation=this.orientationRotation.compose(t),this}rotoTranslate(t,r){const o=this._transformation;return o.rotation=t,o.translation=r,this}transform(t,r){return this._transformation=r(t,this._transformation),this}getVertexCountPerStrip(t){return this._vertices[t].length/3}get vertexByteSize(){return this._vertexByteSize}getByteSizePerStrip(t=0){return this._vertices[t].length*H+(this._vertexColors.length>0?this._vertexColors[t].length*H:0)+(this._vertexNormals.length>0?this._vertexNormals[t].length*H:0)+(this._vertexTangents.length>0?this._vertexTangents[t].length*H:0)+(this._vertexTextureCoords.length>0?this._vertexTextureCoords[t].length*H:0)}setCullMode(t){return this._cullMode=t,this}addVertices(t){this._vertices.push(t)}getBufferData(){return this._bufferData!==null?this._bufferData:(this._bufferData=this._vertices.map((t,r)=>{const o=[];for(let i=0,s=0,n=0,a=0;i<t.length;i+=3,s+=4,n+=3,a+=2){const c=[t[i+0],t[i+1],t[i+2]];this._vertexColors.length>r&&(c.push(this._vertexColors[r][s+0]),c.push(this._vertexColors[r][s+1]),c.push(this._vertexColors[r][s+2]),c.push(this._vertexColors[r][s+3])),this._vertexNormals.length>r&&(c.push(this._vertexNormals[r][n+0]),c.push(this._vertexNormals[r][n+1]),c.push(this._vertexNormals[r][n+2])),this._vertexTangents.length>r&&(c.push(this._vertexTangents[r][n+0]),c.push(this._vertexTangents[r][n+1]),c.push(this._vertexTangents[r][n+2])),this._vertexTextureCoords.length>r&&(c.push(this._vertexTextureCoords[r][a+0]),c.push(this._vertexTextureCoords[r][a+1])),o.push(...c)}return new Float32Array(o)}),this._bufferData)}get layouts(){let t=0,r=0;const o=[{shaderLocation:t,offset:0,format:"float32x3"}];return t+=1,r+=3*H,this._vertexColors.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x4"}),t+=1,r+=4*H),this._vertexNormals.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x3"}),t+=1,r+=3*H),this._vertexTangents.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x3"}),t+=1,r+=3*H),this._vertexTextureCoords.length>0&&(o.push({shaderLocation:t,offset:r,format:"float32x2"}),t+=1,r+=2*H),o}get buffers(){return this._buffers}get bufferLayout(){if(this._bufferLayout===null)throw new Error("TriangleData: Buffer layout is not available! - Did you call buildGpuBuffer() ?");return this._bufferLayout}buildGpuBuffer(t){this._buffers=this.getBufferData().map(r=>Ne(t.device,r)),this._bufferLayout={arrayStride:this.vertexByteSize,attributes:this.layouts}}addColors(t){this._vertexColors.length===0&&(this._vertexByteSize+=4*4),this._vertexColors.push(t)}addNormals(t){var r;this._vertexNormals.length===0&&(this._vertexByteSize+=3*4),(r=this._vertexNormals)==null||r.push(t)}addTangents(t){var r;this._vertexTangents.length===0&&(this._vertexByteSize+=3*4),(r=this._vertexTangents)==null||r.push(t)}addTextures(t){this._vertexTextureCoords.length===0&&(this._vertexByteSize+=2*4),this._vertexTextureCoords.push(t)}}const Bt=(e,t)=>{const r=e[t+0],o=e[t+1],i=e[t+2],s=S.fromPoints(o,r),n=S.fromPoints(i,r);return w.crossProduct(s,n)},We=(e,t)=>{const r=e[t-2],o=e[t-1],i=e[t-0],s=S.fromPoints(o,r),n=S.fromPoints(o,i);return w.crossProduct(n,s)},Xe=(e,t)=>{const r=[],o=e==="triangle-list"?3:1;if(e==="triangle-strip"){let i=Bt(t,0);r.push(i),r.push(i);for(let s=2;s<t.length;s+=1)We(t,s),r.push(i)}else for(let i=0;i<t.length-2;i+=o){const s=Bt(t,i);r.push(s),r.push(s),r.push(s)}return r},st=(e,t,r)=>{const{w:o,h:i}=t,s=o/2,n=i/2,a=e.origin,c=[],u=[],l=[],d=w.fromValues(0,0,1),h=w.fromValues(1,0,0);c.push(g.fromValues(a.x-s,a.y-n,0)),c.push(g.fromValues(a.x+s,a.y-n,0)),c.push(g.fromValues(a.x-s,a.y+n,0)),c.push(g.fromValues(a.x-s,a.y+n,0)),c.push(g.fromValues(a.x+s,a.y-n,0)),c.push(g.fromValues(a.x+s,a.y+n,0)),u.push(d,d,d,d,d,d),l.push(h,h,h,h,h,h);const f=[],{pos:p,size:v}=r,{w:m,h:V}=v,_=m/2,y=V/2;f.push({u:p.u+_,v:p.v-y}),f.push({u:p.u-_,v:p.v-y}),f.push({u:p.u+_,v:p.v+y}),f.push({u:p.u+_,v:p.v+y}),f.push({u:p.u-_,v:p.v-y}),f.push({u:p.u-_,v:p.v+y});const b=c.map(M=>M.absolute(e)),x=u.map(M=>M.absolute(e));return[b,x,l,f]},nt=(e,t)=>{const r=t.transpose().invert();return[e[0].map(o=>o.map(t).triplet).flat(),e[1].map(o=>o.map(r).triplet).flat(),e[2].map(o=>o.map(r).triplet).flat(),e[3].map(o=>[o.u,o.v]).flat()]},Ke=(e,t,r=1)=>{const o=[],i=Math.PI*2,s=i/e,n=[],a=[],c=w.fromValues(0,0,1),u=Math.atan(1/.5),l=Math.PI/2-u,d=Math.sin(l),h=-.5+r;if(r>=1)for(let f=0;f<i;f+=s){const p=g.fromValues(0,0,-t),v=g.fromValues(.5*Math.cos(f),.5*Math.sin(f),t),m=g.fromValues(.5*Math.cos(f+s),.5*Math.sin(f+s),t);o.push(p),o.push(v),o.push(m);const V=w.fromValues(Math.cos(f),Math.sin(f),d),_=w.fromValues(Math.cos(f+s),Math.sin(f+s),d),y=V;n.push(y,V,_);const b=w.fromVector(y.crossProduct(c)),x=w.fromVector(V.crossProduct(c)),M=w.fromVector(_.crossProduct(c));a.push(b,x,M)}else{const f=(1-r)/Math.sin(u)*Math.cos(u);for(let p=0;p<i;p+=s){const v=g.fromValues(f*Math.cos(p),f*Math.sin(p),h),m=g.fromValues(.5*Math.cos(p),.5*Math.sin(p),t),V=g.fromValues(.5*Math.cos(p+s),.5*Math.sin(p+s),t),_=g.fromValues(f*Math.cos(p+s),f*Math.sin(p+s),h),y=w.fromValues(Math.cos(p),Math.sin(p),d),b=w.fromValues(Math.cos(p+s),Math.sin(p+s),d);o.push(v),o.push(m),o.push(V),n.push(y,y,b),o.push(V),o.push(_),o.push(v),n.push(b,b,y);const x=w.fromVector(y.crossProduct(c)),M=w.fromVector(b.crossProduct(c));a.push(y,x,M),a.push(b,M,x)}}return[o,n,a]},yt=(e,t,r,o=.5)=>{const i=o,s=w.fromValues(0,0,1),n=w.fromValues(0,0,-1),a=[],c=[],u=r==="up"?0:Math.PI*2,l=r==="up"?Math.PI*2/e:-Math.PI*2/e,d=r==="up"?h=>h<Math.PI*2:h=>h>0;for(let h=u;d(h);h+=l){const f=g.fromValues(0,0,t),p=g.fromValues(i*Math.cos(h),i*Math.sin(h),t),v=g.fromValues(i*Math.cos(h+l),i*Math.sin(h+l),t);c.push(f),c.push(p),c.push(v),r==="up"?a.push(s,s,s):a.push(n,n,n)}return[c,a]},Qe=(e,t,r)=>{const o=[],i=[],s=[],n=Math.PI/e,a=g.fromValues(0,0,t),c=g.fromValues(0,0,r),u=w.fromValues(0,0,1);for(let l=0;l<Math.PI*2;l+=n){const d=g.fromValues(.5*Math.cos(l),.5*Math.sin(l),t),h=w.fromPoints(d,a);o.push(d),i.push(h),s.push(w.fromVector(h.crossProduct(u)));const f=g.fromValues(.5*Math.cos(l+n),.5*Math.sin(l+n),t),p=w.fromPoints(f,a);o.push(f),i.push(p),s.push(w.fromVector(p.crossProduct(u)));const v=g.fromValues(.5*Math.cos(l),.5*Math.sin(l),r),m=w.fromPoints(v,c);o.push(v),i.push(m),s.push(w.fromVector(m.crossProduct(u)));const V=g.fromValues(.5*Math.cos(l),.5*Math.sin(l),r),_=w.fromPoints(V,c);o.push(V),i.push(_),s.push(w.fromVector(_.crossProduct(u)));const y=g.fromValues(.5*Math.cos(l+n),.5*Math.sin(l+n),t),b=w.fromPoints(y,a);o.push(y),i.push(b),s.push(w.fromVector(b.crossProduct(u)));const x=g.fromValues(.5*Math.cos(l+n),.5*Math.sin(l+n),r),M=w.fromPoints(x,c);o.push(x),i.push(M),s.push(w.fromVector(M.crossProduct(u)))}return[o,i,s]},wt=e=>{let t=Math.asin(e.z);return[(Math.atan2(e.y,e.x)+Math.PI)/(2*Math.PI),.5-t/Math.PI]},bt=e=>[(Math.atan2(e.y,e.x)+Math.PI)/(2*Math.PI),e.z+.5],Xt=(e,t,r)=>{const o=Math.min(e[0],t[0],r[0]),i=Math.max(e[0],t[0],r[0]);Math.abs(i-o)>.8&&(e[0]<.4&&t[0]<.4?r[0]-=1:e[0]<.4&&r[0]<.4?t[0]-=1:t[0]<.4&&r[0]<.4?e[0]-=1:e[0]>.6&&t[0]>.6?r[0]+=1:e[0]>.6&&r[0]>.6?t[0]+=1:t[0]>.6&&r[0]>.6&&(e[0]+=1))},Je=(e,t)=>{const{id:r,textureCoordinates:o}=t,i=T.rotationX(N(-90)),s=T.rotationX(N(180)),n=T.rotationX(N(90)),a=T.rotationZ(N(-90)).rotationY(N(90)),c=T.rotationZ(N(90)).rotationY(N(-90)),u=Ct.from2Vectors(g.fromValues(0,0,.5),w.fromValues(0,0,1),w.fromValues(1,0,0)),l=u.map(s),d=u.map(i),h=u.map(n),f=u.map(a),p=u.map(c),v={w:.25,h:.25},m=st(u,{w:1,h:1},{pos:{u:.25+.25/2,v:.25/2},size:v}),V=st(l,{w:1,h:1},{pos:{u:.25+.25/2,v:.5+.25/2},size:v}),_=st(d,{w:1,h:1},{pos:{u:.25+.25/2,v:.25+.25/2},size:v}),y=st(h,{w:1,h:1},{pos:{u:.75+.25/2,v:.25+.25/2},size:v}),b=st(f,{w:1,h:1},{pos:{u:0+.25/2,v:.25+.25/2},size:v}),x=st(p,{w:1,h:1},{pos:{u:.5+.25/2,v:.25+.25/2},size:v}),[M,C,I,D]=nt(m,e),E=nt(V,e),R=nt(_,e),k=nt(y,e),Z=nt(b,e),L=nt(x,e);M.push(...E[0],...R[0],...k[0],...Z[0],...L[0]),C.push(...E[1],...R[1],...k[1],...Z[1],...L[1]),I.push(...E[2],...R[2],...k[2],...Z[2],...L[2]),D.push(...E[3],...R[3],...k[3],...Z[3],...L[3]);const it=new lt(r,"triangle-list",t);return it.addVertices(new Float32Array(M)),it.addNormals(new Float32Array(C)),it.addTangents(new Float32Array(I)),o&&it.addTextures(new Float32Array(D)),it},tr=()=>Je,er=(e,t)=>{const{steps:r,id:o,textureCoordinates:i}=t,s=e.transpose().invert(),n=[],a=[],c=[],u=[],[l,d]=yt(r,.5,"up"),[h,f]=yt(r,-.5,"down"),[p,v,m]=Qe(r,-.5,.5);if(n.push(...l.map(_=>_.map(e))),n.push(...h.map(_=>_.map(e))),n.push(...p.map(_=>_.map(e))),i){let _=0,y=0;const b=l.map(C=>[C.x+.5,C.y+.5]),x=h.map(C=>[C.x+.5,C.y+.5]),M=p.map(C=>{const I=C.z+.5;let D=(Math.atan2(C.y,C.x)+Math.PI)/(2*Math.PI);return D<Math.min(_,y)&&(D+=1),y=_,_=D,[D,I]});u.push(...b),u.push(...x),u.push(...M)}a.push(...d.map(_=>_.map(s))),a.push(...f.map(_=>_.map(s))),a.push(...v.map(_=>_.map(s))),c.push(...l.map(_=>w.fromValues(1,0,0).map(s))),c.push(...h.map(_=>w.fromValues(-1,0,0).map(s))),c.push(...m.map(_=>_.map(s)));const V=new lt(o,"triangle-list",t);return V.addVertices(new Float32Array(n.map(_=>_.triplet).flat())),V.addNormals(new Float32Array(a.map(_=>_.triplet).flat())),V.addTangents(new Float32Array(c.map(_=>_.triplet).flat())),i&&V.addTextures(new Float32Array(u.flat())),V},rr=()=>er,O=.5257311121191336,q=.8506508083520399,or=[w.fromValues(-O,0,q),w.fromValues(O,0,q),w.fromValues(-O,0,-q),w.fromValues(O,0,-q),w.fromValues(0,q,O),w.fromValues(0,q,-O),w.fromValues(0,-q,O),w.fromValues(0,-q,-O),w.fromValues(q,O,0),w.fromValues(-q,O,0),w.fromValues(q,-O,0),w.fromValues(-q,-O,0)],ir=[[0,4,1],[0,9,4],[9,5,4],[4,5,8],[4,8,1],[8,10,1],[8,3,10],[5,3,8],[5,2,3],[2,7,3],[7,10,3],[7,6,10],[7,11,6],[11,0,6],[0,1,6],[6,1,10],[9,0,11],[9,11,2],[9,2,5],[7,2,11]];function sr(e,t){return w.fromVector(e.add(t))}function Kt(e,t,r=1){const o=new Map,i=[];function s(n,a){const c=n<a,u=`${c?n:a}-${c?a:n}`,l=o.get(u);if(l)return l;const d=sr(S.fromValues(...e[n].triplet),S.fromValues(...e[a].triplet));e.push(d);const h=e.length-1;return o.set(u,h),h}for(const[n,a,c]of t){const u=s(n,a),l=s(n,c),d=s(a,c);i.push([n,u,l]),i.push([a,d,u]),i.push([c,l,d]),i.push([u,d,l])}return r===1?[e,i]:Kt(e,i,r-1)}const nr=(e,t)=>{const{steps:r,id:o,textureCoordinates:i}=t,s=e.transpose().invert(),n=w.fromValues(0,0,1),[a,c]=Kt(or,ir,r),u=[],l=[],d=[],h=[],f=g.fromValues(0,0,0);c.forEach(v=>{const m=g.fromVector(a[v[2]]),V=g.fromVector(a[v[1]]),_=g.fromVector(a[v[0]]),y=w.fromVector(S.fromPoints(m,f)),b=w.fromVector(S.fromPoints(V,f)),x=w.fromVector(S.fromPoints(_,f));if(u.push(...m.map(e).triplet),u.push(...V.map(e).triplet),u.push(..._.map(e).triplet),l.push(...y.map(s).triplet),l.push(...b.map(s).triplet),l.push(...x.map(s).triplet),d.push(...w.fromVector(y.crossProduct(n)).triplet),d.push(...w.fromVector(b.crossProduct(n)).triplet),d.push(...w.fromVector(x.crossProduct(n)).triplet),i){const M=wt(y),C=wt(b),I=wt(x);Xt(M,C,I),h.push(...M),h.push(...C),h.push(...I)}});const p=new lt(o,"triangle-list",t);return p.addVertices(new Float32Array(u)),p.addNormals(new Float32Array(l)),p.addTangents(new Float32Array(d)),i&&p.addTextures(new Float32Array(h)),p},Nt=()=>nr,ar=(e,t)=>{const{steps:r,id:o}=t,i=e.transpose().invert(),s=e.scaleVector,n=Math.min(s.x,s.y)/r,a=Math.floor(s.x/n),c=Math.floor(s.y/n),u=1/a,l=1/c,d=[];for(let h=0;h<a;h++){d.push([]);for(let f=0;f<c+1;f++)d[h].push(g.fromValues(-.5+u*h,-.5+l*f,0)),d[h].push(g.fromValues(-.5+u*(h+1),-.5+l*f,0))}return d.map(h=>{const f=Xe("triangle-strip",h);return[new Float32Array(h.map(p=>p.map(e).triplet).flat()),new Float32Array(f.map(p=>p.map(i).triplet).flat()),new Float32Array(h.map(p=>w.fromValues(1,0,0).map(i).triplet).flat()),new Float32Array(h.map(p=>[p.x+.5,p.y+.5]).flat())]}).reduce((h,[f,p,v,m])=>(h.addVertices(f),h.addNormals(p),h.addTangents(v),h.addTextures(m),h),new lt(o,"triangle-strip",t)).setCullMode("none")},cr=()=>ar,lr=(e,t)=>{const{steps:r,id:o,height:i,textureCoordinates:s}=t,n=e.transpose().invert();let a=[];const c=[],u=[],l=[],d=Math.atan(1/.5),h=(1-Math.min(1,i))/Math.sin(d)*Math.cos(d),[f,p]=yt(r,-.5,"down"),[v,m,V]=Ke(r,-.5,i),[_,y]=yt(r,-.5+i,"up",h);if(a.push(..._),a.push(...f),a.push(...v),s){l.push(..._.map(M=>[M.x+.5,M.y+.5])),l.push(...f.map(M=>[M.x+.5,M.y+.5]));const x=v.length/3;for(let M=0;M<x;M++){const C=bt(v[M*3+0]),I=bt(v[M*3+1]),D=bt(v[M*3+2]);Xt(C,I,D),l.push(C),l.push(I),l.push(D)}}a=a.map(x=>x.map(e)),c.push(...y.map(x=>x.map(n))),c.push(...p.map(x=>x.map(n))),c.push(...m.map(x=>x.map(n))),u.push(..._.map(x=>w.fromValues(1,0,0).map(n))),u.push(...f.map(x=>w.fromValues(-1,0,0).map(n))),u.push(...V.map(x=>x.map(n)));const b=new lt(o,"triangle-list",t);return b.addVertices(new Float32Array(a.map(x=>x.triplet).flat())),b.addNormals(new Float32Array(c.map(x=>x.triplet).flat())),b.addTangents(new Float32Array(u.map(x=>x.triplet).flat())),s&&b.addTextures(new Float32Array(l.flat())),b},ur=()=>lr,hr=(e,t)=>{const{id:r,colors:o,showAxes:i}=t,s=e.scaleVector,n=Math.min(s.x,s.y),a=Math.log10(n),c=Math.max(.6-(a-Math.floor(a)),0),u=Math.min(1,c+.2),l=Math.max(.15,c-.3),d=Math.floor(a)-1,h=Math.floor(a),f=Math.floor(a)-2,p=Math.pow(10,d),v=Math.pow(10,h),m=Math.pow(10,f)*2;console.log("prev tileDim",m,"with total grids",n/m," with alpha",l),console.log("main tileDim",p,"with total grids",n/p," with alpha",c),console.log("next tileDim",v,"with total grids",n/v," with alpha",u);const V=Mt(s,p,e,!i),_=Mt(s,v,e,!i),y=new lt(r,"line-list",t);if(i){const b=[],x=g.fromValues(-0,0,0).map(e),M=g.fromValues(.5,0,0).map(e),C=g.fromValues(0,-0,0).map(e),I=g.fromValues(0,.5,0).map(e),D=g.fromValues(0,0,0).map(e),E=g.fromValues(0,0,p),R=g.fromValues(-.5,0,0).map(e),k=g.fromValues(0,0,0).map(e),Z=g.fromValues(-0,-.5,0).map(e),L=g.fromValues(0,0,0).map(e);b.push(x,M,C,I,D,E,R,k,Z,L);const it=[[1,0,0,1],[1,0,0,1],[0,1,0,1],[0,1,0,1],[.1,.1,1,1],[.1,.1,1,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1],(o==null?void 0:o[0])??[.5,.5,.5,1]];y.addVertices(new Float32Array(b.flatMap(Jt=>Jt.triplet))),y.addColors(new Float32Array(it.flat()))}if(y.addVertices(new Float32Array(_.flatMap(b=>b.triplet))),y.addColors(new Float32Array(Vt(_,u,o==null?void 0:o[0]))),y.addVertices(new Float32Array(V.flatMap(b=>b.triplet))),y.addColors(new Float32Array(Vt(V,c,o==null?void 0:o[1]))),n/m<100){const b=Mt(s,m,e,!i);y.addVertices(new Float32Array(b.flatMap(x=>x.triplet))),y.addColors(new Float32Array(Vt(b,l,o==null?void 0:o[2])))}return y},dr=()=>hr,Mt=(e,t,r,o=!0)=>{const i=e.x/t,s=e.y/t,n=1/i,a=1/s,c=-.05,u=[];if(o){const l=g.fromValues(0,-.5,c).map(r),d=g.fromValues(0,.5,c).map(r);u.push(l,d)}for(let l=1;l<i/2;l++){const d=g.fromValues(-n*l,-.5,c).map(r),h=g.fromValues(-n*l,.5,c).map(r);if(u.push(d,h),n*l<.5){const f=g.fromValues(n*l,-.5,c).map(r),p=g.fromValues(n*l,.5,c).map(r);u.push(f,p)}}if(o){const l=g.fromValues(-.5,0,c).map(r),d=g.fromValues(.5,0,c).map(r);u.push(l,d)}for(let l=1;l<s/2;l++){const d=g.fromValues(-.5,-a*l,c).map(r),h=g.fromValues(.5,-a*l,c).map(r);if(u.push(d,h),a*l<.5){const f=g.fromValues(-.5,a*l,c).map(r),p=g.fromValues(.5,a*l,c).map(r);u.push(f,p)}}return u};function Vt(e,t,r){return e.flatMap(()=>r??[.5,.5,.5,t])}const fr=(e,t=[10,10,10])=>{let r=g.fromValues(0,0,0),o=g.fromValues(...t),i=o.x===0&&o.y===0?w.fromValues(0,1,0):w.fromValues(0,0,1),s=[0,0],n=[0,0],a=0,c=0,u=Math.PI/5,l=S.fromPoints(o,r).lengthSquare,d=Ct.lookAt(o,r,i),h=!1;return[{move:(f,p,v)=>{const m=Math.min(e.canvas.width,e.canvas.height),V=Math.max(e.canvas.width,e.canvas.height);let _=Math.log(l)*Math.atan(u)/(V/2),y=u/m*2;switch(f){case"mouse-0":s=[p.direction[0]*_,p.direction[1]*_],h=!0;break;case"mouse-1":n=[-p.direction[0]*y,p.direction[1]*y];break;case"mouse-2":u+=p.direction[1]*y;break;case"none":h=!1;break}},zoom:f=>{const p=Math.log(l+1)/(2500*Math.atan(u));a=f*p},tilt:f=>{c=f*5e-4,h=!1}},{view:f=>{if(!f||f!=null&&f.isIdentity)return T.lookAt(o,r,i);const p=S.fromPoints(o,r).scale(1-a);p.length>2&&p.length<500&&(o=r.add(p));const v=S.fromPoints(r,o),m=T.move(v).apply(d),V=[Math.tan(n[0])*l,Math.tan(n[1])*l],_=S.fromValues(V[0],V[1],0).absolute(m),y=m.relative(o);let b=m.relative(i);b=T.rotationZ(c).apply(b);const x=T.rotationX(-s[1]).compose(T.rotationY(-s[0]));o=x.apply(y).absolute(m),i=x.apply(b).absolute(m);const M=T.move(_);return r=M.apply(r),o=M.apply(o),d=Ct.lookAt(o,r,i),h||(s=[s[0]*.95,s[1]*.95],c*=.9,a*=.9,Math.abs(s[0])<.001&&Math.abs(s[1])<.001&&Math.abs(c)<.001&&Math.abs(a)<.001&&(s=[0,0],c=0,a=0)),n=[0,0],l=S.fromPoints(o,r).length,d.toTransform()},projection:f=>{const p=e.canvas.width/e.canvas.height,v=S.fromPoints(o,r).length,m=Math.max(400,v*.8);return T.perspective(u,p,Math.max(.01,v-m),v+m)}}]},Qt=(e,t)=>{const r=-N(9),o=g.fromValues(30,0,0),i=g.fromValues(-8,0,-1);e.setAmbientLight([.01,.01,.01,.01]);const s=w.fromVector(g.origin().subtract(o)),n=w.fromVector(g.origin().subtract(i));switch(e.setLight("directional",0,{dir:s,col:[.55,.55,.5,0]}),e.setLight("directional",1,{dir:n,col:[.6,.6,.6,0]}),e.setLight("point",0,{pos:o,col:[.8,.8,.7,0]}),e.setLight("point",1,{pos:i,col:[.18,.18,.4,0]}),e.setLight("point",2,{pos:i,col:[.1,.1,.4,0]}),e.setLight("point",3,{pos:i,col:[.1,.1,.4,0]}),t){case"globe":e.setLight("directional",0,{dir:s,col:[.6,.6,.6,.6]}),e.setLight("directional",1,{dir:n,col:[.18,.18,.4,.2]}),e.setLight("point",0,{pos:o,col:[.8,.8,.7,1]}),e.setLight("point",1,{pos:i,col:[.18,.18,.4,.8]});break;case"cylinder":e.setAmbientLight([.1,.1,.1,.01]),e.setLight("point",0,{pos:g.fromValues(20,0,0),col:[.8,.5,.5,1]}),e.setLight("point",1,{pos:g.fromValues(-20,0,0),col:[.3,.6,.8,1]});break;case"cube":e.setAmbientLight([.15,.15,.15,.1]),e.setLight("point",0,{pos:g.fromValues(5,0,0),col:[.7,.7,.7,1]});break;case"cone":e.setAmbientLight([.5,.5,.5,.1]),e.setLight("point",0,{pos:g.fromValues(10,0,0),col:[.4,.8,.4,.6]}),e.setLight("point",1,{pos:g.fromValues(-10,10,0),col:[.8,.4,.4,.6]});break;case"plane":e.setAmbientLight([.5,.5,.5,.1]),e.setLight("directional",0,{dir:w.fromValues(0,-1,0),col:[1,1,1,1]}),e.setLight("directional",1,{dir:w.fromValues(0,1,0),col:[1,1,1,1]}),e.setLight("point",0,{pos:g.fromValues(10,0,0),col:[.4,.8,.4,.6]}),e.setLight("point",1,{pos:g.fromValues(-10,10,0),col:[.8,.4,.4,.6]});break}return console.log("Lights initialized:",t),{dirLights:(a,c)=>{const u=a/1e3,l=T.rotationZ(r*u);c[0].dir=c[0].dir.map(l)},posLights:(a,c)=>{const u=a/1e3,l=T.rotationZ(r*u*1.5),d=T.rotationZ(r*u);c[0].pos=c[0].pos.map(l),c[1].pos=c[1].pos.map(d)}}};let G=0,Ut=0;const pr=e=>({plane:t=>{const r=t/1e3;return G+=r*N(360/40),{rotation:tt.rotationZ(G).rotateY(G/2)}},cone:t=>{const r=t/1e3;return G+=r*N(360/10),{rotation:tt.rotationX(G).rotateY(G/2).rotateZ(G/3)}},"earth-clouds":t=>{const r=t/1e3;return Ut-=r*.015,{rotation:tt.rotationY(N(23.5)).rotateZ(Ut)}},"earth-sphere":t=>{const r=t/1e3;return G-=r*.022,{rotation:tt.rotationY(N(23.5)).rotateZ(G)}},cylinder:t=>{const r=t/1e3;return G+=r*N(360/20),{rotation:tt.rotationZ(G).rotateY(G)}},cube:t=>{const r=t/1e3;return G+=r*N(360/10),{rotation:tt.rotationZ(G).rotateY(G).rotateZ(G)}}}),K={textures:[],globeTextures:[],showGrid:!1},mr=e=>{const t=Nt()(T.scale(2.5,2.5,2.48),{id:"earth-sphere",steps:5,colors:[[.3,.4,.7,1]],textureCoordinates:!0,alpha:1,bumpIntensity:0});t.addMaterial(e[0]);const r=Nt()(T.scale(2.53,2.53,2.53),{id:"earth-clouds",steps:4,colors:[[1,1,1,0]],textureCoordinates:!0,alpha:.1,bumpIntensity:.01});return r.addMaterial(e[1]),r.addMaterial(e[1]),[t,r]},vr=e=>{const t=rr()(T.scale(3,3,4),{id:"cylinder",steps:36,colors:[[.6,.6,.5,1]],textureCoordinates:!0,alpha:.8,bumpIntensity:0});return t.addMaterial(e[0]),[t]},gr=e=>{const t=tr()(T.scale(2,2,2),{id:"cube",textureCoordinates:!0,alpha:1,bumpIntensity:0});return t.addMaterial(e[1]),[t]},_r=e=>{const t=ur()(T.scale(3,3,4).translation(0,0,1),{id:"cone",steps:48,height:.8,textureCoordinates:!0,colors:[[.58,.83,.56,1]],alpha:.8,bumpIntensity:0});return t.addMaterial(e[3]),[t]},yr=e=>{const t=cr()(T.scale(4,4,1).rotationY(N(75)),{id:"plane",steps:12,textureCoordinates:!0,colors:[[.4,.4,.4,1]],alpha:1,bumpIntensity:.1});return t.addMaterial(e[2]),t.addMaterial(e[2]),[t]},xr=()=>[dr()(T.scale(180,180,1).translation(0,0,0),{id:"ref-plane",colors:[[.2,.2,.3,.4]],showAxes:!0})];async function wr(e,t){const r=await $e(e);await r.setupShaders("standard-3d");const[o,i]=fr(r,[6,6,4]);r.captureMouseMotion(o);const s=pr(),n=Qt(r,"none");r.beginRenderLoop({camera:i,lights:n,models:s});const a=xr();return r.setScene(a),r}const ht=(e,t)=>()=>{e.getScene().forEach(o=>o.display="none"),e.get("ref-plane")[0].display=K.showGrid?"full":"none";const r=Qt(e,t);switch(e.setLightsHandler(r),t){case"plane":{const o=e.get("plane");if(o.length>0)o.forEach(i=>i.display="full");else{const i=yr(K.textures);e.addToScene(i)}break}case"globe":{const o=e.get("earth-sphere","earth-clouds");if(o.length>0)o.forEach(i=>i.display="full");else{const i=mr(K.globeTextures);e.addToScene(i)}break}case"cylinder":{const o=e.get("cylinder");if(o.length>0)o.forEach(i=>i.display="full");else{const i=vr(K.textures);e.addToScene(i)}break}case"cone":{const o=e.get("cone");if(o.length>0)o.forEach(i=>i.display="full");else{const i=_r(K.textures);e.addToScene(i)}break}case"cube":{const o=e.get("cube");if(o.length>0)o.forEach(i=>i.display="full");else{const i=gr(K.textures);e.addToScene(i)}break}}},br=(e,t)=>()=>{console.log("setWireframe",t.checked),t.checked?e.setPipelineMode("alternative"):e.setPipelineMode("default")},Mr=(e,t)=>()=>{console.log("setGrid",t.checked),K.showGrid=t.checked,e.get("ref-plane")[0].display=K.showGrid?"full":"none"},Q=document.getElementById("support"),Et=document.getElementById("gfx-canvas"),dt=document.getElementById("fps");!Q||!Et?alert("The app is broken! No canvas was found!"):wr(Et).then(e=>(Q.innerText="Loading textures...",Gt(e,["earth.jpg","clouds-4k.png"]))).then(([e,t])=>(K.globeTextures.push(...t),Q.innerText="Almost there...",e)).then(e=>Gt(e,["wood-2k.jpg","dice.png","water.jpg","metal.jpg"])).then(([e,t])=>{K.textures.push(...t);const r=document.getElementById("wireframe");r.onclick=br(e,r);const o=document.getElementById("grid");o.onclick=Mr(e,o);const i=document.getElementById("geo-globe"),s=document.getElementById("geo-cylinder"),n=document.getElementById("geo-cube"),a=document.getElementById("geo-cone"),c=document.getElementById("geo-plane");i.onclick=ht(e,"globe"),s.onclick=ht(e,"cylinder"),n.onclick=ht(e,"cube"),a.onclick=ht(e,"cone"),c.onclick=ht(e,"plane"),i.click(),Q.innerText="All set!",Q.style.opacity="0",dt&&(dt.style.opacity="1",dt.style.width="160px"),setInterval(()=>{Q&&(Q.style.display="none"),dt&&(dt.innerText=`FPS: ${e.fps.toFixed(0)}`)},2e3)}).catch(e=>{Q&&(Q.innerText="Error: "+e.message)});
