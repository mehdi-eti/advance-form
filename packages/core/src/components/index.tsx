/**
 * Export all shadcn/ui component adapters
 */

import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Card } from './Card';
import { Form } from './Form';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Container } from './Container';
import { Grid } from './Grid';
import { Flex } from './Flex';
import { Dialog } from './Dialog';

// Placeholder components for components not yet implemented
export const Accordion = () => <div>Accordion - Not yet implemented</div>;
export const Alert = () => <div>Alert - Not yet implemented</div>;
export const AlertDialog = () => <div>AlertDialog - Not yet implemented</div>;
export const AspectRatio = () => <div>AspectRatio - Not yet implemented</div>;
export const Avatar = () => <div>Avatar - Not yet implemented</div>;
export const Badge = () => <div>Badge - Not yet implemented</div>;
export const Breadcrumb = () => <div>Breadcrumb - Not yet implemented</div>;
export const ButtonGroup = () => <div>ButtonGroup - Not yet implemented</div>;
export const Calendar = () => <div>Calendar - Not yet implemented</div>;
export const Carousel = () => <div>Carousel - Not yet implemented</div>;
export const Chart = () => <div>Chart - Not yet implemented</div>;
export const Collapsible = () => <div>Collapsible - Not yet implemented</div>;
export const Combobox = () => <div>Combobox - Not yet implemented</div>;
export const Command = () => <div>Command - Not yet implemented</div>;
export const ContextMenu = () => <div>ContextMenu - Not yet implemented</div>;
export const DataTable = () => <div>DataTable - Not yet implemented</div>;
export const DatePicker = () => <div>DatePicker - Not yet implemented</div>;
export const Drawer = () => <div>Drawer - Not yet implemented</div>;
export const DropdownMenu = () => <div>DropdownMenu - Not yet implemented</div>;
export const Empty = () => <div>Empty - Not yet implemented</div>;
export const Field = () => <div>Field - Not yet implemented</div>;
export const HoverCard = () => <div>HoverCard - Not yet implemented</div>;
export const InputGroup = () => <div>InputGroup - Not yet implemented</div>;
export const InputOTP = () => <div>InputOTP - Not yet implemented</div>;
export const Kbd = () => <div>Kbd - Not yet implemented</div>;
export const Label = () => <div>Label - Not yet implemented</div>;
export const Menubar = () => <div>Menubar - Not yet implemented</div>;
export const NativeSelect = () => <div>NativeSelect - Not yet implemented</div>;
export const NavigationMenu = () => <div>NavigationMenu - Not yet implemented</div>;
export const Pagination = () => <div>Pagination - Not yet implemented</div>;
export const Popover = () => <div>Popover - Not yet implemented</div>;
export const Progress = () => <div>Progress - Not yet implemented</div>;
export const RadioGroup = () => <div>RadioGroup - Not yet implemented</div>;
export const Resizable = () => <div>Resizable - Not yet implemented</div>;
export const ScrollArea = () => <div>ScrollArea - Not yet implemented</div>;
export const Separator = () => <div>Separator - Not yet implemented</div>;
export const Sheet = () => <div>Sheet - Not yet implemented</div>;
export const Sidebar = () => <div>Sidebar - Not yet implemented</div>;
export const Skeleton = () => <div>Skeleton - Not yet implemented</div>;
export const Slider = () => <div>Slider - Not yet implemented</div>;
export const Sonner = () => <div>Sonner - Not yet implemented</div>;
export const Spinner = () => <div>Spinner - Not yet implemented</div>;
export const Switch = () => <div>Switch - Not yet implemented</div>;
export const Table = () => <div>Table - Not yet implemented</div>;
export const Tabs = () => <div>Tabs - Not yet implemented</div>;
export const Toast = () => <div>Toast - Not yet implemented</div>;
export const Toggle = () => <div>Toggle - Not yet implemented</div>;
export const ToggleGroup = () => <div>ToggleGroup - Not yet implemented</div>;
export const Tooltip = () => <div>Tooltip - Not yet implemented</div>;
export const Typography = () => <div>Typography - Not yet implemented</div>;

// Re-export all in an object
const ShadcnComponents: Record<string, React.ComponentType<any>> = {
  Button,
  Input,
  Textarea,
  Card,
  Form,
  Select,
  Checkbox,
  Container,
  Grid,
  Flex,
  Dialog,
  Accordion,
  Alert,
  AlertDialog,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  ButtonGroup,
  Calendar,
  Carousel,
  Chart,
  Collapsible,
  Combobox,
  Command,
  ContextMenu,
  DataTable,
  DatePicker,
  Drawer,
  DropdownMenu,
  Empty,
  Field,
  HoverCard,
  InputGroup,
  InputOTP,
  Kbd,
  Label,
  Menubar,
  NativeSelect,
  NavigationMenu,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Resizable,
  ScrollArea,
  Separator,
  Sheet,
  Sidebar,
  Skeleton,
  Slider,
  Sonner,
  Spinner,
  Switch,
  Table,
  Tabs,
  Toast,
  Toggle,
  ToggleGroup,
  Tooltip,
  Typography,
};

export default ShadcnComponents;
