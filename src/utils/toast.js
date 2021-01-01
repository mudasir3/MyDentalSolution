
import Toast from 'react-native-root-toast'



export default function showToast(msg)
 {
     Toast.show(msg, {
   duration: Toast.durations.LONG,
   position: Toast.positions.BOTTOM,
   shadow: true,
   animation: true,
   hideOnPress: true,
   delay: 0, 
 });}