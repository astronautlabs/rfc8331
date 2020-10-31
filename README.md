# @/rfc8331
[![npm](https://img.shields.io/npm/v/@astronautlabs/rfc8331)](https://npmjs.com/package/@astronautlabs/rfc8331)

## Implementation of RFC 8331, RTP Payload for SMPTE ST 291-1 Ancillary Data

> **Alpha Quality**  
> This software is very new and unstable. Use with caution, and avoid use in 
> production without careful consideration. Major API changes may be made 
> frequently.

This library provides the ability to read and write packetized SMPTE ST 291 ancillary messages via RTP, as codified in 
IETF RFC 8331, which builds on SMPTE ST 2038 ("Carriage of Ancillary Data Packets in an MPEG-2 Transport Stream"), using 
the `@astronautlabs/bitstream` bitstream serialization library. It can be used to prepare and parse ancillary messages 
for being sent via RTP, which is useful for implementing SMPTE ST 2110-40 ("Professional Media Over Managed IP Networks: 
SMPTE ST 291-1 Ancillary Data").