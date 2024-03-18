'use client';
import { useRouteChange } from 'nextjs13-router-events';
import React, { useState } from 'react';
import { MobileMenuProviderProps } from '.';
import useClasses from '../use-classes';
import { MobileMenuContext } from './mobile-menu-context';

const MobileMenuProvider: React.FC<React.PropsWithChildren<MobileMenuProviderProps>> = ({ children, contentAnimationTime = 300 }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isDirection, setDirection] = useState<'left' | 'right'>('left');

  useRouteChange({
    onRouteChangeStart: () => {
      setIsEnabled(false);
    },
    onRouteChangeComplete: () => {
      setIsEnabled(false);
    },
  });

  return (
    <MobileMenuContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
        direction: isDirection,
        setDirection,
      }}
    >
      <div
        className={useClasses('mobile-menu-container', {
          'mobile-menu-active': isEnabled,
        })}
      >
        {children}
      </div>

      <style jsx>{`
        .mobile-menu-container {
          width: 100%;
          height: 100%;
          transform-origin: ${isDirection === 'left' ? 'right' : 'left'} top;
          transition: transform ${contentAnimationTime}ms ease-out;
        }
        .mobile-menu-active {
          transition: all ${contentAnimationTime}ms ease-in;
          transform: scale(0.95);
        }
      `}</style>
    </MobileMenuContext.Provider>
  );
};

MobileMenuProvider.displayName = 'HimalayaMobileMenuProvider';
export default MobileMenuProvider;
