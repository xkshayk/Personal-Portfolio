# Robot Arm Assembly - 3D Viewer Setup

## Exporting from SolidWorks to STL (Easiest Method!)

Your robot arm assembly can be exported directly from SolidWorks as an STL file - no third-party software needed!

### Steps to Export STL from SolidWorks:

1. **Open your robot arm assembly** in SolidWorks
2. **File → Save As**
3. **Select file type**: "STL (*.stl)"
4. **Click Options** to configure export settings:
   - **Units**: Millimeters (or your preferred unit)
   - **Output as**: Binary (smaller file size) or ASCII (larger but readable)
   - **Resolution**: Fine or Custom
     - For better quality: move slider to "Fine"
     - For smaller file: move slider to "Coarse"
   - **Preview**: Check "Preview" to see the mesh quality before exporting
5. **Click OK** and **Save**
6. **Name the file**: `model.stl`

### Export Settings Recommendations:

- ✅ **Binary format** - Smaller file size, faster loading
- ✅ **Fine resolution** - Better visual quality (adjust if file is too large)
- ✅ **Check "Do not translate STL output data to positive space"** if available

## File Placement

Once you have your `model.stl` file:

1. Create a folder in the `public` directory:
   ```
   public/robot-arm-assembly/
   ```

2. Place your STL file there:
   ```
   public/robot-arm-assembly/model.stl
   ```

3. The component will automatically load it!


## Customizing Colors and Materials

Since STL files don't include color information, you can customize the appearance in the code. Edit `src/components/RobotArmModel.tsx`:

```tsx
// Change the color (current: indigo #4f46e5)
<meshStandardMaterial 
  color="#ff6b6b"  // Red
  metalness={0.8}   // 0 = plastic, 1 = mirror-like metal
  roughness={0.2}   // 0 = shiny, 1 = matte
/>
```

### Popular color schemes:
- **Metallic silver**: `color="#c0c0c0" metalness={0.9} roughness={0.1}`
- **Matte black**: `color="#1a1a1a" metalness={0.3} roughness={0.8}`
- **Robot blue**: `color="#4f46e5" metalness={0.8} roughness={0.2}` (current)
- **Industrial orange**: `color="#ff6b35" metalness={0.6} roughness={0.4}`

## Adjusting Model Size and Position

If your model appears too large, small, or off-center, adjust the `scale` value:

```tsx
<mesh geometry={geometry} scale={0.01}>  // Current scale
```

- **Too small**: Increase to `0.02` or `0.05`
- **Too large**: Decrease to `0.005` or `0.001`
- **Different scales per axis**: Use `scale={[0.01, 0.02, 0.01]}`

## File Size Optimization

STL files from SolidWorks can be large. To reduce size:

1. **In SolidWorks export settings**:
   - Reduce resolution slider (move toward "Coarse")
   - Balance quality vs file size

2. **Use online STL compressor**:
   - https://www.meshlab.net/ (free desktop tool)
   - Import STL → Filters → Remeshing → Simplification
   - Export optimized STL

## Troubleshooting

- **Model appears too large/small**: Adjust the `scale` prop in `RobotArmModel.tsx`
- **Model is upside down**: Add rotation: `rotation={[Math.PI, 0, 0]}`
- **Model is sideways**: Try `rotation={[Math.PI / 2, 0, 0]}`
- **File won't load**: Check browser console for errors, verify file path
- **Performance issues**: Reduce STL resolution or compress the file

## Multiple STL Files

If you want to load multiple parts with different colors, you can load multiple STL files:

```tsx
// Load base in gray
<mesh geometry={baseGeometry} scale={0.01}>
  <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
</mesh>

// Load arm in blue  
<mesh geometry={armGeometry} scale={0.01}>
  <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
</mesh>
```

## Current State

The component currently displays a **placeholder** (blue geometric shapes) until you add the STL file. Once you place `model.stl` in `public/robot-arm-assembly/`, it will automatically display your robot arm assembly with full interactive controls!
