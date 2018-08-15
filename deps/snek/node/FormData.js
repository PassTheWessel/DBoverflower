"use strict";const path=require("path"),mime=require("./mime");class FormData{constructor(){this.boundary=`--Snek--${Math.random().toString().slice(2,7)}`,this.buffers=[]}append(e,r,t){if(void 0===r)return;let n=`\r\n--${this.boundary}\r\nContent-Disposition: form-data; name="${e}"`,f=null;if(t){n+=`; filename="${t}"`,f="application/octet-stream";const e=path.extname(t).slice(1);e&&(f=mime.lookup(e))}r instanceof Buffer?f=mime.buffer(r):"object"==typeof r?(f="application/json",r=Buffer.from(JSON.stringify(r))):r=Buffer.from(String(r)),f&&(n+=`\r\nContent-Type: ${f}`),this.buffers.push(Buffer.from(`${n}\r\n\r\n`)),this.buffers.push(r)}getBoundary(){return this.boundary}end(){return Buffer.concat([...this.buffers,Buffer.from(`\r\n--${this.boundary}--`)])}get length(){return this.buffers.reduce((e,r)=>e+Buffer.byteLength(r),0)}}module.exports=FormData;