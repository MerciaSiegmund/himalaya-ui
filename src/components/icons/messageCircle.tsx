'use client';
import React from 'react';
import {IconPropsNative} from './'
const MessageCircle = ({ size = 24, color, style, ...props } : IconPropsNative ) => {
  return <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" shapeRendering="geometricPrecision" viewBox="0 0 24 24" {...props} height={size} width={size} style={{...style, color: color }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
}
export default MessageCircle;