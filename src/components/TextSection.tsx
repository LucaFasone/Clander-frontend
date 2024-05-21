function TextSection({ className }: { className?: string }) {
  return (
    <div className={`${className} border-4 boxColorShadow w-1/2 px-20 flex items-center justify-center`}>
      <p className="text-xl text-zinc-600 ">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quia delectus ut illum? Minima id quia autem inventore itaque magnam ut fuga sed, voluptatibus ab est quaerat odit reprehenderit repudiandae.
      </p>
    </div>
    
  )
}

export default TextSection