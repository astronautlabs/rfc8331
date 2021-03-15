import { BitstreamElement, Field } from "@astronautlabs/bitstream";
import * as ST291 from '@astronautlabs/st291';

export const ANC_MIMETYPE = 'video/smpte291';

export class AncillaryMessage extends BitstreamElement {
    /**
     * This flag, when set to "1", indicates that the ANC data
     * corresponds to the color-difference data channel (C). When
     * set to "0", this flag indicates either that the ANC data
     * corresponds to the luma (Y) data channel, that the ANC data
     * source is from an SD signal, or that the ANC data source has
     * no specific luma or color-difference data channels. For ANC
     * data from a multi-stream interface source, the C flag SHALL
     * refer to the channel of the stream used to transport the ANC
     * data packet. For situations where there is no SDI source, if
     * the ANC data type definition specifically requires the use of
     * the C or Y data channel, the C flag SHALL reflect that
     * requirement.
     */
    @Field(1) c : number;

    /**
     * This field contains the digital interface line number that
     * corresponds to the location of the ANC data packet as an
     * unsigned integer in network byte order.
     * The following special Line_Number values indicate that the
     * location of the ANC data packet is in certain generic
     * vertical regions of the SDI raster:
     * 
     * - 0x7FF: Without specific line location within the field or
     *   frame 
     * - 0x7FE: On any line in the range from the second line after
     *   the line specified for switching, as defined in SMPTE
     *   RP 168 [RP168], to the last line before active video,
     *   inclusive 
     * - 0x7FD: On a line number larger than can be represented in 11
     *   bits of this field (if needed for future formats)
     * 
     * Note that the lines that are available to convey ANC data are
     * as defined in the applicable sample structure specification
     * (e.g., SMPTE ST 274 [ST274], SMPTE ST 296 [ST296], ITU-R
     * BT.656 [BT656]) and are possibly further restricted per SMPTE
     * RP 168 [RP168].
     * In multi-stream interfaces, this field refers to the line
     * number that an ANC data packet is carried on within a
     * particular data stream in the interface.
     */
    @Field(11) lineNumber : number;

    /**
     * This field defines the location of the ANC data packet in an
     * SDI raster relative to the start of active video (SAV; a
     * digital synchronizing signal present in SDI interfaces) as an
     * unsigned integer in network byte order. A value of 0 means
     * that the ADF of the ANC data packet begins immediately
     * following SAV. The horizontal offset from SAV is measured in
     * terms of 10-bit words of the indicated data stream and data
     * channel.
     * The following special Horizontal_Offset values indicate that
     * the location of the ANC data packet is in certain generic
     * horizontal regions of the SDI raster:
     * 
     * - 0xFFF: Without specific horizontal location 
     * - 0xFFE: Within horizontal ancillary data space (HANC) as
     *   defined in SMPTE ST 291-1 [ST291] 
     * - 0xFFD: Within the ancillary data space located between SAV
     *   (Start of Active Video) and EAV (End of Active Video)
     *   markers of the serial digital interface 
     * - 0xFFC:  Horizontal offset is larger than can be represented in
     *   the 12 bits of this field (if needed for future
     *   formats or for certain low frame rate 720p formats)
     * 
     * In multi-stream interfaces, this field refers to the
     * horizontal location where an ANC data packet is placed on a
     * line carried within a particular data stream in the
     * interface.
     * 
     * Note that HANC data space will generally have higher luma
     * sample numbers than any samples in the active digital line.
     * Also note that SMPTE ST 296 [ST296] (1280 x 720 progressive
     * active images) image sampling systems 7 and 8 (1280 x 720
     * progressive @ 24 fps and 1280 x 720 progressive @ 23.98 fps
     * respectively) have a luma sample number maximum of 4124. It
     * is unlikely that an actual implementation would have an ANC
     * data packet begin at a Horizontal_Offset beyond 4091 (0xFFB)
     * in these formats; should that occur, the Horizontal_Offset
     * value 0xFFC can be used to signal a horizontal offset larger
     * than can be represented in the field. Further note that the
     * 12-bit field of Horizontal_Offset is kept that size in this
     * memo to maintain easy conversion to/from SMPTE ST 2038
     * [ST2038], which also has a 12-bit Horizontal_Offset field.
     * 
     */
    @Field(12) horizontalOffset : number;

    /**
     * This field indicates whether the data stream number of a
     * multi-stream data mapping used to transport the ANC data
     * packet is specified. If the S bit is ’0’, then the StreamNum
     * field provides no guidance regarding the source data stream
     * number of the ANC data packet. If the S bit is ’1’, then the
     * StreamNum field carries information regarding the source data
     * stream number of the ANC data packet.
     */
    @Field(1) dataStreamFlag : number;

    /**
     * If the S bit (Data Stream Flag) is ’1’, then the StreamNum
     * field MUST carry identification of the source data stream
     * number of the ANC data packet. If the data stream is
     * numbered, then the StreamNum field SHALL carry the number of
     * the source data stream minus one. If the source multi-stream
     * interface does not have numbered data streams, the following
     * numbers SHALL be used in this field: ’0’ for link A data
     * stream and ’1’ for link B data stream. For stereoscopic
     * multi-stream interface formats that do not have numbered
     * streams, the following numbers SHALL be used in this field:
     * ’0’ for left eye stream and ’1’ for right eye stream.
     * Note that in multi-link SDI connections, the physical link
     * that a particular stream utilizes is typically specified by
     * the interface standard. Also note that numbering of data
     * streams is across the interface as a whole. For example, in
     * the SMPTE ST 425-3 dual-link 3 Gb/s interface, the data
     * streams are numbered 1-4 with data streams 1 and 2 on link 1
     * and data streams 3 and 4 on link 2.
     */
    @Field(7) streamNum : number;

    /**
     * Data identification word
     */
    @Field(10) did : number;

    /**
     * Secondary data identification word. Used only for a "Type 2"
     * ANC data packet. Note that in a "Type 1" ANC data packet,
     * this word will actually carry the data block number (DBN).
     */
    @Field(10) sdid : number;

    /**
     * The lower 8 bits of Data_Count, corresponding to bits b7
     * (MSB; most significant bit) through b0 (LSB; least
     * significant bit) of the 10-bit Data_Count word, contain the
     * actual count of 10-bit words in User_Data_Words. Bit b8 is
     * the even parity for bits b7 through b0, and bit b9 is the
     * inverse (logical NOT) of bit b8.
     */
    @Field(2) // TODO: autocalc
    dataCountParity : number;

    @Field(8)
    dataCount : number;

    @Field(i => i.dataCount, { serializer: new ST291.Serializer() }) 
    userData : Buffer;

    @Field(10) checksum : number;
    @Field(i => 32 - (((i.userData.length * 10) - 2 + 10) % 32)) 
    wordAlign : number = 0;
}

export class RTPPacketHeader extends BitstreamElement {
    @Field(2) version : number;
    @Field(1) p : number;
    @Field(1) x : Number;
    @Field(4) cc : number;

    /**
     * The marker bit set to "1" indicates the last ANC data RTP packet
     * for a frame (for progressive scan video) or the last ANC data RTP
     * packet for a field (for interlaced video).
     */
    @Field(1) marker : number;
    @Field(7) pt : number;
    @Field(16) sequenceNumber : number;
    @Field(32) timestamp : number;
    @Field(32) ssrc : number;

    /**
     * The high-order bits of the extended 32-bit sequence number,
     * in network byte order. This is the same as the Extended
     * Sequence Number field in RFC 4175 [RFC4175].
     */
    @Field(16) extendedSequenceNumber : number;

    /**
     * Number of octets of the ANC data RTP payload, beginning with
     * the "C" bit of the first ANC packet data header, as an
     * unsigned integer in network byte order. Note that all
     * word_align fields contribute to the calculation of the Length
     * field.
     */
    @Field(16) length : number;
}

export class AncillaryPacket extends BitstreamElement {
    @Field(8) ancCount : number = 0;

    /**
     * These two bits relate to signaling the field specified by the
     * RTP timestamp in an interlaced SDI raster. A value of 0b00
     * indicates that either the video format is progressive or that
     * no field is specified. A value of 0b10 indicates that the
     * timestamp refers to the first field of an interlaced video
     * signal. A value of 0b11 indicates that the timestamp refers
     * to the second field of an interlaced video signal. The value
     * 0b01 is not valid. Receivers SHOULD ignore an ANC data
     * packet with an F field value of 0b01 and SHOULD process any
     * other ANC data packets with valid F field values that are
     * present in the RTP payload.
     * Note that some multi-stream SDI interfaces might use multiple
     * interlaced signal streams to transmit progressive images, in
     * which case the "F" bits would refer to the field of the
     * interlaced stream used for transport of the ANC data packet.
     */
    @Field(2) field : number;

    /**
     * The 22 reserved bits of value "0" follow the F field to
     * ensure that the first ANC data packet header field in the
     * payload begins 32-bit word-aligned with the start of the RTP
     * header to ease implementation.
     */
    @Field(22) reserved : number = 0;

    /**
     * ancCount (8 bits):
     *   This field is the count of the total number of ANC data
     *   packets carried in the RTP payload, as an unsigned integer.
     *   A single ANC data RTP packet payload cannot carry more than
     *   255 ANC data packets.
     *   If more than 255 ANC data packets need to be carried in a
     *   field or frame, additional RTP packets carrying ANC data MAY
     *   be sent with the same RTP timestamp but with different
     *   sequence numbers. ANC_Count of 0 indicates that there are no
     *   ANC data packets in the payload (for example, an RTP packet
     *   that carries no actual ANC data packets even though its
     *   marker bit indicates the last ANC data RTP packet in a field/
     *   frame). If the ANC_Count is 0, the Length will also be 0.
     */
    @Field(0, { array: { count: i => i.ancCount, type: AncillaryMessage } })
    messages : AncillaryMessage[];
}