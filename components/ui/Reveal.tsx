"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants, viewportOnce } from "@/lib/motion";
import clsx from "clsx";

/**
 * Wrapper de reveal scroll-driven. Pone un container con stagger
 * y permite usar <Reveal.Item> para los hijos animados.
 * Se usa en cabeceras de sección, listas y cards.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const MotionTag = motion[Tag as "div"] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

Reveal.Item = function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={clsx(className)}>
      {children}
    </motion.div>
  );
};
