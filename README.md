# @/rfc8331
[![npm](https://img.shields.io/npm/v/@astronautlabs/rfc8331)](https://npmjs.com/package/@astronautlabs/rfc8331)

## Implementation of RFC 8331, RTP Payload for SMPTE ST 291-1 Ancillary Data


> **[📜 IETF RFC 8331](https://tools.ietf.org/html/rfc8331)**  
> RTP Payload for Society of Motion Picture and Television Engineers (SMPTE) ST 291-1 Ancillary Data

> 📝 **Beta Quality**  
> This library is new, with limited compatibility guarantees between 
> releases (beta, semver 0.x.x).

This library provides the ability to read and write packetized SMPTE ST 291 ancillary messages via RTP, as codified in 
IETF RFC 8331, which builds on SMPTE ST 2038 ("Carriage of Ancillary Data Packets in an MPEG-2 Transport Stream"), using 
the `@astronautlabs/bitstream` bitstream serialization library. It can be used to prepare and parse ancillary messages 
for being sent via RTP, which is useful for implementing SMPTE ST 2110-40 ("Professional Media Over Managed IP Networks: 
SMPTE ST 291-1 Ancillary Data").